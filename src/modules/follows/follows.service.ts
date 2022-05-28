import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { Follow } from "src/entities/user_management_service/follow.entity";
import { FollowsRepository } from "./follows.repository";

@Injectable()
export class FollowsService extends BaseService<Follow, FollowsRepository> {
  constructor(private readonly followsRepository: FollowsRepository) {
    super(followsRepository);
  }

  findFollowersByCustomerId(customerId: number): Promise<Follow[]> {
    return this.followsRepository.find({
      where: {
        followedId: customerId,
      },
      relations: ["follower"],
    });
  }

  findFollowedsByCustomerId(customerId: number): Promise<Follow[]> {
    return this.followsRepository.find({
      where: {
        followerId: customerId,
      },
      relations: ["followed"],
    });
  }

  findFollowByFollowerAndFollowed(
    followerId: number,
    followedId: number,
  ): Promise<Follow | null> {
    return this.followsRepository.findOne({
      where: {
        followedId: followedId,
        followerId: followerId,
      },
    });
  }
}
