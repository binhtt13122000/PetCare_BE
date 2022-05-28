import { Module } from "@nestjs/common";
import { FollowsService } from "./follows.service";
import { FollowsController } from "./follows.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FollowsRepository } from "./follows.repository";

@Module({
  imports: [TypeOrmModule.forFeature([FollowsRepository])],
  providers: [FollowsService],
  controllers: [FollowsController],
  exports: [FollowsService],
})
export class FollowsModule {}
