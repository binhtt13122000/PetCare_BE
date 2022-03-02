import { Account } from "src/entities/account.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Account)
export class UserRepository extends Repository<Account> {}
