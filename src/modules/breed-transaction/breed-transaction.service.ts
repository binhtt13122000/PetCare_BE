import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { BreedingTransaction } from "src/entities/transaction_service/breeding-transaction.entity";
import { BreedTransactionRepository } from "./breed-transaction.repository";

@Injectable()
export class BreedTransactionService extends BaseService<
  BreedingTransaction,
  BreedTransactionRepository
> {
  constructor(
    private readonly breedTransactionRepository: BreedTransactionRepository,
  ) {
    super(breedTransactionRepository);
  }

  getBreedTransactionsByOwnerPetFemaleId(
    ownerPetFemaleId: number,
    limit: number,
    page: number,
  ): Promise<BreedingTransaction[]> {
    return this.breedTransactionRepository.find({
      where: {
        ownerPetFemaleId: ownerPetFemaleId,
      },
      take: limit,
      skip: (page - 1) * limit,
      relations: [
        "ownerPetMale",
        "ownerPetFemale",
        "petMale",
        "petFemale",
        "petFemale.breed",
        "petFemale.breed.species",
        "petMale.breed",
        "petMale.breed.species",
      ],
      order: {
        createdTime: "DESC",
      },
    });
  }

  getBreedTransactionsByOwnerPetMaleIdId(
    ownerPetMaleId: number,
    limit: number,
    page: number,
  ): Promise<BreedingTransaction[]> {
    return this.breedTransactionRepository.find({
      where: {
        ownerPetMaleId: ownerPetMaleId,
      },
      take: limit,
      skip: (page - 1) * limit,
      relations: [
        "ownerPetMale",
        "ownerPetFemale",
        "petMale",
        "petFemale",
        "petFemale.breed",
        "petFemale.breed.species",
        "petMale.breed",
        "petMale.breed.species",
      ],
      order: {
        createdTime: "DESC",
      },
    });
  }

  getOne(id: number): Promise<BreedingTransaction> {
    return this.breedTransactionRepository.findOne({
      where: {
        id: id,
      },
      relations: [
        "ownerPetMale",
        "ownerPetFemale",
        "petMale",
        "petFemale",
        "post",
        "branch",
        "petFemale.breed",
        "petFemale.breed.species",
        "petMale.breed",
        "petMale.breed.species",
      ],
    });
  }
}
