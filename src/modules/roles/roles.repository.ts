import { EntityRepository, Repository } from "typeorm";
import { Role } from "src/entities/role.entity";

@EntityRepository(Role)
export class RolesRepository extends Repository<Role> {}
