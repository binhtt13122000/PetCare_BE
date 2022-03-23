import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { Role } from "src/entities/role.entity";
import { RolesRepository } from "./roles.repository";

@Injectable()
export class RolesService extends BaseService<Role, RolesRepository> {
  constructor(private readonly rolesRepository: RolesRepository) {
    super(rolesRepository);
  }
}
