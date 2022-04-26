import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { SaleTransaction } from "src/entities/transaction_service/sale-transaction.entity";
import { SaleTransactionsRepository } from "./sale-transaction.repository";

@Injectable()
export class SaleTransactionsService extends BaseService<
  SaleTransaction,
  SaleTransactionsRepository
> {
  constructor(
    private readonly saleTransactionsRepository: SaleTransactionsRepository,
  ) {
    super(saleTransactionsRepository);
  }
}
