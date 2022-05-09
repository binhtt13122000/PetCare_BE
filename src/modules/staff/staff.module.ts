import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../users/user.module";
import { StaffRepository } from "./staff.repository";
import { StaffService } from "./staff.service";
import { SharedModule } from "src/shared/shared.module";
import { StaffsController } from "./staff.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([StaffRepository]),
    UserModule,
    SharedModule,
  ],
  controllers: [StaffsController],
  providers: [StaffService],
  exports: [StaffService],
})
export class StaffModule {}
