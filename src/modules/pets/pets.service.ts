import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { Pet } from "src/entities/pet_service/pet.entity";
import { PetEnum } from "src/enum";
import { PetsRepository } from "./pets.repository";

@Injectable()
export class PetsService extends BaseService<Pet, PetsRepository> {
  constructor(private readonly petsRepository: PetsRepository) {
    super(petsRepository);
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

  getPetListWithoutBreedToCreatePostByCustomerIdAndSpeciesId(
    customerId: number,
    type: "BREED" | "SALE",
    gender?: "MALE" | "FEMALE",
    speciesId?: number,
  ): Promise<Pet[]> {
    let whereString = "";
    if (speciesId) {
      whereString =
        "pet.status = 'NORMAL' and pet_owners.customerId = :customerId and pet_owners.isCurrentOwner = true and breed.speciesId = :speciesId";
    } else {
      whereString =
        "pet.status = 'NORMAL' and pet_owners.customerId = :customerId and pet_owners.isCurrentOwner = true";
    }
    if (type === "BREED") {
      whereString += " and pet.isSeed = true";
    }
    if (gender === "FEMALE") {
      whereString += " and pet.gender = 'FEMALE'";
    } else if (gender === "MALE") {
      whereString += " and pet.gender = 'MALE'";
    }
    return this.petsRepository
      .createQueryBuilder("pet")
      .where(
        whereString,
        speciesId
          ? {
              customerId,
              speciesId,
            }
          : {
              customerId,
            },
      )
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
