import { Branch } from "src/entities/user_management_service/branch.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Branch)
export class BranchesRepository extends Repository<Branch> {}
