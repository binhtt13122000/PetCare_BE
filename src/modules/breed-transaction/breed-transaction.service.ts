import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { BreedingTransaction } from "src/entities/transaction_service/breeding-transaction.entity";
import { BreedingTransactionEnum } from "src/enum";
import { In } from "typeorm";
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

  checkExistedBreedingTransactionAvailableWithPostId(
    postId: number,
  ): Promise<number> {
    return this.breedTransactionRepository.count({
      where: {
        postId: postId,
        status: In([
          BreedingTransactionEnum.CREATED,
          BreedingTransactionEnum.SUCCESS,
          BreedingTransactionEnum.BREEDING_REQUESTED,
          BreedingTransactionEnum.IN_PROGRESS,
          BreedingTransactionEnum.BREEDING_FINISHED,
          BreedingTransactionEnum.BREEDING_SUCCESS,
        ]),
      },
    });
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
        "post",
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
        "post",
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

  getBreedingTransactionAvailableByPetId(
    petId: number,
  ): Promise<BreedingTransaction[]> {
    return this.breedTransactionRepository.find({
      where: {
        petFemaleId: petId,
        status: BreedingTransactionEnum.BREEDING_FINISHED,
      },
      order: {
        dateOfFinish: "DESC",
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
        "petFemale.breed",
        "petFemale.breed.species",
        "petMale.breed",
        "petMale.breed.species",
        "breedingBranch",
        "petCombos",
        "petCombos.petComboServices",
        "petCombos.petComboServices.service",
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
          ? "breed-transactions.branchId = :branchId and breed-transactions.status IN(:...status) and breed-transactions.paymentTime >= :firstDate and breed-transactions.paymentTime <= :lastDate"
          : "breed-transactions.status IN(:...status) and breed-transactions.paymentTime >= :firstDate and breed-transactions.paymentTime <= :lastDate",
        branchId
          ? {
              branchId: branchId,
              status: [
                BreedingTransactionEnum.SUCCESS,
                BreedingTransactionEnum.BREEDING_SUCCESS,
              ],
              firstDate: firstDate,
              lastDate: lastDate,
            }
          : {
              status: [
                BreedingTransactionEnum.SUCCESS,
                BreedingTransactionEnum.BREEDING_SUCCESS,
              ],
              firstDate: firstDate,
              lastDate: lastDate,
            },
      )
      .leftJoinAndSelect("breed-transactions.branch", "branch")
      .groupBy("breed-transactions.branchId")
      .addGroupBy("branch.name")
      .addGroupBy("branch.representativeName")
      .select(
        'SUM(breed-transactions.serviceFee) as "serviceFee", SUM(breed-transactions.transactionFee) as "transactionFee", COUNT(breed-transactions.id) as "numberOfBreedingPets", breed-transactions.branchId, branch.name, branch.representativeName',
      )
      .execute();
  }

  getBreedingTransactionsAvailableInSpecificDate(
    date: string,
    status: BreedingTransactionEnum,
  ): Promise<BreedingTransaction[]> {
    return this.breedTransactionRepository.find({
      where: {
        meetingTime: date,
        status: status,
      },
    });
  }
}
