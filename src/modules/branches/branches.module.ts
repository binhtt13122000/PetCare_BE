import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../users/user.module";
import { SharedModule } from "src/shared/shared.module";
import { BranchesRepository } from "./branches.repository";
import { BranchesController } from "./branches.controller";
import { BranchesService } from "./branches.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([BranchesRepository]),
    UserModule,
    SharedModule,
  ],
  controllers: [BranchesController],
  providers: [BranchesService],
  exports: [BranchesService],
})
export class BranchesModule {}
