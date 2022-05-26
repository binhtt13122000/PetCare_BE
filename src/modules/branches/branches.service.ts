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

  findBranchByLatAndLng(lat: number, lng: number): Promise<Branch[]> {
    return this.branchRepository
      .createQueryBuilder("branch")
      .having(
        "( 3959 * acos( cos( radians(37) ) * cos( radians( :lat ) ) * cos( radians( :lng ) - radians(-122) ) + sin( radians(37) ) * sin( radians( :lat ) ) ) ) < 25",
      )
      .andHaving("branch.id")
      .orderBy(
        "( 3959 * acos( cos( radians(37) ) * cos( radians( :lat ) ) * cos( radians( :lng ) - radians(-122) ) + sin( radians(37) ) * sin( radians( :lat ) ) ) )",
      )
      .setParameter("lat", lat)
      .setParameter("lng", lng)
      .getMany();
  }
}
