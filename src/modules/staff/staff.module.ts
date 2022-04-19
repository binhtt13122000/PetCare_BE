import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StaffRepository } from "./staff.repository";
import { StaffService } from "./staff.service";

@Module({
  imports: [TypeOrmModule.forFeature([StaffRepository])],
  controllers: [],
  providers: [StaffService],
  exports: [StaffService],
})
export class StaffModule {}
