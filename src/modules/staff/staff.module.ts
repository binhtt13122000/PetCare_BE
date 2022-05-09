import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../users/user.module";
import { StaffRepository } from "./staff.repository";
import { StaffService } from "./staff.service";
import { SharedModule } from "src/shared/shared.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([StaffRepository]),
    UserModule,
    SharedModule,
  ],
  controllers: [],
  providers: [StaffService],
  exports: [StaffService],
})
export class StaffModule {}
