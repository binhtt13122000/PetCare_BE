import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../users/user.module";
import { SharedModule } from "src/shared/shared.module";
import { BranchRepository } from "./branch.repository";
import { BranchController } from "./branch.controller";
import { BranchService } from "./branch.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([BranchRepository]),
    UserModule,
    SharedModule,
  ],
  controllers: [BranchController],
  providers: [BranchService],
  exports: [BranchService],
})
export class BrachModule {}
