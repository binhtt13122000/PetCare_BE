import { Account } from "src/entities/authenticate_service/account.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Account)
export class UserRepository extends Repository<Account> {}
