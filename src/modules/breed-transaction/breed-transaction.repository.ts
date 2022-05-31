import { BreedingTransaction } from "src/entities/transaction_service/breeding-transaction.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(BreedingTransaction)
export class BreedTransactionRepository extends Repository<BreedingTransaction> {}
