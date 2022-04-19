import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { Staff } from "src/entities/user_management_service/staff.entity";
import { StaffRepository } from "./staff.repository";

@Injectable()
export class StaffService extends BaseService<Staff, StaffRepository> {
  constructor(private readonly staffRepository: StaffRepository) {
    super(staffRepository);
  }

  findByAccountId(accountId: number): Promise<Staff | null> {
    return this.staffRepository.findOne({
      where: { accountId },
    });
  }
}
