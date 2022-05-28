import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { TransactionFee } from "src/entities/service/transaction-fee.entity";
import { ServiceEnum } from "src/enum";
import { TransactionFeesRepository } from "./transaction-fees.repository";

@Injectable()
export class TransactionFeesService extends BaseService<
  TransactionFee,
  TransactionFeesRepository
> {
  constructor(
    private readonly transactionFeesRepository: TransactionFeesRepository,
  ) {
    super(transactionFeesRepository);
  }

  getTransactionFeeByType(type: ServiceEnum): Promise<TransactionFee[]> {
    return this.transactionFeesRepository.find({
      where: {
        type: type,
      },
      order: {
        price: "ASC",
      },
    });
  }
}
