import {
  BadRequestException,
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { ChainData } from "src/common";
import { Pet } from "src/entities/pet_service/pet.entity";
import { PetEnum } from "src/enum";
import { PetsRepository } from "./pets.repository";
import { Cache } from "cache-manager";
import { CreateChainDTO } from "./dto/create-chain.dto";
import { AxiosService } from "src/shared/axios/axios.service";
import { Raw } from "typeorm";

@Injectable()
export class PetsService extends BaseService<Pet, PetsRepository> {
  constructor(
    private readonly petsRepository: PetsRepository,
    private readonly axiosService: AxiosService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    super(petsRepository);
  }

  async checkIsExistPetNameWithCustomerId(
    name: string,
    customerId: number,
  ): Promise<boolean> {
    const result = await this.petsRepository
      .createQueryBuilder("pet")
      .where(
        " pet_owners.customerId = :customerId and pet_owners.isCurrentOwner = true and LOWER(pet.name) = LOWER(:name)",
        {
          customerId,
          name,
        },
      )
      .orderBy("pet.id", "DESC")
      .innerJoin("pet.petOwners", "pet_owners")
      .getMany();
    return result.length > 0 ? true : false;
  }

  async getChain(id: number): Promise<{ key: string; value: ChainData[] }> {
    const pet = await this.findById(id);
    if (!pet) {
      throw new NotFoundException("not found");
    }
    if (!pet.specialMarkings) {
      throw new NotFoundException("not found microchip");
    }
    return this.axiosService.getHistory(pet.specialMarkings);
  }

  async getChainByUUID(
    uuid: string,
  ): Promise<{ key: string; value: ChainData[] }> {
    const data: number = await this.cacheManager.get(uuid);
    const id = data ? Number(data) : 0;
    const pet = await this.findById(id);
    if (!pet) {
      throw new NotFoundException("not found");
    }
    if (!pet.specialMarkings) {
      throw new NotFoundException("not found microchip");
    }
    return this.axiosService.getHistory(pet.specialMarkings);
  }

  async createChain(dto: CreateChainDTO): Promise<string> {
    const pet = await this.findById(dto.id);
    if (!pet) {
      throw new NotFoundException("not found");
    }
    if (pet.specialMarkings) {
      throw new BadRequestException("had microchip");
    }
    await this.update(dto.id, {
      ...pet,
      specialMarkings: dto.specialMarkings,
    });
    const fullDataPet = await this.getOne(dto.id, true);
    return this.axiosService.setData(
      fullDataPet,
      "CREATE",
      "The data of pet is init with adding microchip:" +
        fullDataPet.specialMarkings,
      fullDataPet.specialMarkings,
    );
  }

  async updatePet(pet: Partial<Pet>): Promise<string | Pet> {
    const updatePet = await this.update(pet.id, pet);
    if (updatePet.specialMarkings) {
      const fullDataPet = await this.getOne(pet.id, true);
      return this.axiosService.setData(
        fullDataPet,
        "UPDATE",
        "Customer update data of pet",
        updatePet.specialMarkings,
      );
    } else {
      return updatePet;
    }
  }

  async deletePet(petId: number): Promise<string> {
    try {
      const pet = await this.findById(petId);
      if (!pet) {
        throw new NotFoundException("not found");
      }
      if (pet.status === PetEnum.IN_POST || pet.status === PetEnum.DELETED) {
        throw Error("Cannot delete this pet");
      }
      const deletedPet = await this.update(petId, {
        ...pet,
        status: PetEnum.DELETED,
      });
      if (deletedPet.specialMarkings) {
        const fullDataPet = await this.getOne(petId, true);
        return this.axiosService.setData(
          fullDataPet,
          "DELETE",
          "Customer deleted the pet.",
          fullDataPet.specialMarkings,
        );
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async updatePetChain(petId: number, message: string): Promise<string> {
    const fullDataPet = await this.getOne(petId, true);
    if (fullDataPet.specialMarkings) {
      return this.axiosService.setData(
        fullDataPet,
        "UPDATE",
        message,
        fullDataPet.specialMarkings,
      );
    }
  }

  getPetListByCustomerId(
    customerId: number,
    type?: PetEnum,
    name?: string,
  ): Promise<Pet[]> {
    let statusString = "";
    if (!type) {
      statusString = "pet.status != 'DELETED'";
    } else {
      statusString = `pet.status = '${type}'`;
    }
    if (!name) {
      name = "%%";
    } else {
      name = `%${name}%`;
    }
    return this.petsRepository
      .createQueryBuilder("pet")
      .where(
        statusString +
          " and pet_owners.customerId = :customerId and pet_owners.isCurrentOwner = true and pet.name LIKE :name",
        {
          customerId,
          name,
        },
      )
      .orderBy("pet.id", "DESC")
      .innerJoinAndSelect("pet.breed", "breed")
      .innerJoinAndSelect("breed.species", "species")
      .innerJoin("pet.petOwners", "pet_owners")
      .getMany();
  }

  getPetListWithoutBreedToCreatePostByCustomerIdAndSpeciesIdAndBreedId(
    customerId: number,
    type: "BREED" | "SALE",
    gender?: "MALE" | "FEMALE",
    speciesId?: number,
    breedId?: number,
  ): Promise<Pet[]> {
    let whereString = "";
    if (speciesId) {
      whereString =
        "pet.status = 'NORMAL' and pet_owners.customerId = :customerId and pet_owners.isCurrentOwner = true and breed.speciesId = :speciesId";
    } else {
      whereString =
        "pet.status = 'NORMAL' and pet_owners.customerId = :customerId and pet_owners.isCurrentOwner = true";
    }
    if (breedId) {
      if (whereString) {
        whereString += " and pet.breedId = :breedId";
      } else {
        whereString =
          "pet.status = 'NORMAL' and pet_owners.customerId = :customerId and pet_owners.isCurrentOwner = true and pet.breedId = :breedId";
      }
    }
    if (type === "BREED") {
      whereString += " and pet.isSeed = true";
    }
    if (gender === "FEMALE") {
      whereString += " and pet.gender = 'FEMALE'";
    } else if (gender === "MALE") {
      whereString += " and pet.gender = 'MALE'";
    }
    const object =
      speciesId && breedId
        ? {
            customerId,
            speciesId,
            breedId,
          }
        : speciesId
        ? {
            customerId,
            speciesId,
          }
        : breedId
        ? {
            customerId,
            breedId,
          }
        : {
            customerId,
          };
    return this.petsRepository
      .createQueryBuilder("pet")
      .where(whereString, object)
      .orderBy("pet.id", "DESC")
      .innerJoinAndSelect("pet.breed", "breed")
      .innerJoinAndSelect("breed.species", "species")
      .innerJoin("pet.petOwners", "pet_owners")
      .getMany();
  }

  async getOne(id: number, currentOwner: boolean): Promise<Pet> {
    return this.petsRepository
      .findOne({
        where: {
          id: id,
        },
        relations: [
          "breed",
          "breed.species",
          "petOwners",
          "petOwners.customer",
          "healthPetRecords",
          "healthPetRecords.vaccine",
          "healthPetRecords.branch",
        ],
      })
      .then((pet) => {
        if (currentOwner) {
          const convertCurrentOwnerBool =
            String(currentOwner).toLowerCase() == "true";
          const petOwners = pet.petOwners.filter(
            (item) => item.isCurrentOwner === convertCurrentOwnerBool,
          );
          pet.petOwners = petOwners;
          return pet;
        } else {
          return pet;
        }
      });
  }
}
