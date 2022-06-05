import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { BreedingTransaction } from "src/entities/transaction_service/breeding-transaction.entity";
import { BreedingTransactionEnum } from "src/enum";
import { Between, IsNull } from "typeorm";
import { BreedTransactionRepository } from "./breed-transaction.repository";
import { StatisticBreedTransactionDTO } from "./dtos/statistic-breed-transaction.dto";

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
    branchId: number,
    firstDate: Date,
    lastDate: Date,
  ): Promise<StatisticBreedTransactionDTO[]> {
    return this.breedTransactionRepository
      .createQueryBuilder("breed-transactions")
      .where(
        branchId
          ? "breed-transactions.branchId = :branchId and breed-transactions.status = :status and breed-transactions.transactionTime >= :firstDate and breed-transactions.transactionTime <= :lastDate"
          : "breed-transactions.status = :status and breed-transactions.transactionTime >= :firstDate and breed-transactions.transactionTime <= :lastDate",
        branchId
          ? {
              branchId: branchId,
              status: BreedingTransactionEnum.SUCCESS,
              firstDate: firstDate,
              lastDate: lastDate,
            }
          : {
              status: BreedingTransactionEnum.SUCCESS,
              firstDate: firstDate,
              lastDate: lastDate,
            },
      )
      .leftJoinAndSelect("breed-transactions.branch", "branch")
      .groupBy("breed-transactions.branchId")
      .addGroupBy("branch.name")
      .addGroupBy("branch.representativeName")
      .select(
        'SUM(breed-transactions.serviceFee) as "serviceFee", COUNT(breed-transactions.id) as "numberOfBreedingPets", breed-transactions.branchId, branch.name, branch.representativeName',
      )
      .execute();
  }
}
