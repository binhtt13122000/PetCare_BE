import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { Branch } from "src/entities/user_management_service/branch.entity";
import { BranchRepository } from "./branch.repository";

@Injectable()
export class BranchService extends BaseService<Branch, BranchRepository> {
  constructor(private readonly branchRepository: BranchRepository) {
    super(branchRepository);
  }

  findByPhoneNumber(phoneNumber: string): Promise<Branch | null> {
    return this.branchRepository.findOne({
      where: { phoneNumber },
    });
  }
}
