import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
} from "@nestjs/common";
import { ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import { Follow } from "src/entities/user_management_service/follow.entity";
import { DeleteResult } from "typeorm";
import { FollowsService } from "./follows.service";

@Controller("follows")
@ApiTags("follows")
export class FollowsController {
  constructor(private readonly followsService: FollowsService) {}

  @Get()
  @ApiQuery({
    name: "followedId",
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: "followerId",
    required: false,
    type: Number,
  })
  async getAll(
    @Query("followedId") followedId: number,
    @Query("followerId") followerId: number,
  ): Promise<Follow[]> {
    try {
      if (followedId) {
        return await this.followsService.findFollowedsByCustomerId(followedId);
      }
      if (followerId) {
        return await this.followsService.findFollowersByCustomerId(followerId);
      }
      return await this.followsService.index();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  @ApiQuery({
    name: "followedId",
    required: true,
    type: Number,
  })
  @ApiQuery({
    name: "followerId",
    required: true,
    type: Number,
  })
  async follow(
    @Query("followedId") followedId: number,
    @Query("followerId") followerId: number,
  ): Promise<Follow> {
    return await this.followsService.store(
      new Follow({
        followedId: followedId,
        followerId: followerId,
      }),
    );
  }

  @Delete(":id")
  @ApiParam({
    name: "id",
    type: Number,
  })
  async delete(@Param("id") id: number): Promise<DeleteResult> {
    try {
      return await this.followsService.delete(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
