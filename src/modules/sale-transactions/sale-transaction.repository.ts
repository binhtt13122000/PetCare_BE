import { SaleTransaction } from "src/entities/transaction_service/sale-transaction.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(SaleTransaction)
export class SaleTransactionsRepository extends Repository<SaleTransaction> {}
