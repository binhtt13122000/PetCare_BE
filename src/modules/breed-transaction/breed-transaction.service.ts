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
}
