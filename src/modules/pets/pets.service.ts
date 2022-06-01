import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { Pet } from "src/entities/pet_service/pet.entity";
import { PetsRepository } from "./pets.repository";

@Injectable()
export class PetsService extends BaseService<Pet, PetsRepository> {
  constructor(private readonly petsRepository: PetsRepository) {
    super(petsRepository);
  }

  getPetListByCustomerId(customerId: number): Promise<Pet[]> {
    return this.petsRepository
      .createQueryBuilder("pet")
      .where(
        "pet.status != 'DELETED' and pet_owners.customerId = :customerId and pet_owners.isCurrentOwner = true",
        {
          customerId,
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

  getOne(id: number): Promise<Pet> {
    return this.petsRepository.findOne({
      where: {
        id: id,
      },
      relations: [
        "breed",
        "breed.species",
        "papers",
        "petOwners",
        "petOwners.customer",
      ],
    });
  }
}
