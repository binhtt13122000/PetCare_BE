import { TransactionFee } from "src/entities/service/transaction-fee.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(TransactionFee)
export class TransactionFeesRepository extends Repository<TransactionFee> {}
