import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { BreedingTransaction } from "src/entities/transaction_service/breeding-transaction.entity";
import { BreedingTransactionEnum } from "src/enum";
import { Between } from "typeorm";
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
        "post.medias",
        "branch",
        "petFemale.breed",
        "petFemale.breed.species",
        "petMale.breed",
        "petMale.breed.species",
      ],
    });
  }

  getBreedTransactionBranchInMonth(
    id: number,
    firstDate: Date,
    lastDate: Date,
  ): Promise<[BreedingTransaction[], number]> {
    return this.breedTransactionRepository.findAndCount({
      where: {
        branchId: id,
        status: BreedingTransactionEnum.SUCCESS,
        transactionTime: Between(firstDate, lastDate),
      },
    });
  }
}
