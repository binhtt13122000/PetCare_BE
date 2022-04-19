import { Staff } from "src/entities/user_management_service/staff.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Staff)
export class StaffRepository extends Repository<Staff> {}
