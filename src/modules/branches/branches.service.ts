import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { Branch } from "src/entities/user_management_service/branch.entity";
import { BranchesRepository } from "./branches.repository";

@Injectable()
export class BranchesService extends BaseService<Branch, BranchesRepository> {
  constructor(private readonly branchRepository: BranchesRepository) {
    super(branchRepository);
  }

  findByPhoneNumber(phoneNumber: string): Promise<Branch | null> {
    return this.branchRepository.findOne({
      where: { phoneNumber },
    });
  }

  getOne(id: number): Promise<Branch> {
    return this.branchRepository.findOne({
      where: {
        id: id,
      },
      relations: ["posts", "orders"],
    });
  }
}
