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

  getBreedTransactionsByBuyerId(
    buyerId: number,
    limit: number,
    page: number,
  ): Promise<BreedingTransaction[]> {
    return this.breedTransactionRepository.find({
      where: {
        buyerId: buyerId,
      },
      take: limit,
      skip: (page - 1) * limit,
      relations: ["ownerPetMale", "ownerPetFemale"],
      order: {
        createdTime: "DESC",
      },
    });
  }

  getBreedTransactionsBySellerId(
    sellerId: number,
    limit: number,
    page: number,
  ): Promise<BreedingTransaction[]> {
    return this.breedTransactionRepository.find({
      where: {
        sellerId: sellerId,
      },
      take: limit,
      skip: (page - 1) * limit,
      relations: ["ownerPetMale", "ownerPetFemale"],
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
      ],
    });
  }
}
