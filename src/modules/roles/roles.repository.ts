import { EntityRepository, Repository } from "typeorm";
import { Role } from "src/entities/authenticate_service/role.entity";

@EntityRepository(Role)
export class RolesRepository extends Repository<Role> {}
