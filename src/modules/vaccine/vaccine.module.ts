import { Module } from "@nestjs/common";
import { VaccineController } from "./vaccine.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VaccineRepository } from "./vaccine.repository";
import { VaccineService } from "./vaccine.service";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([VaccineRepository])],
  controllers: [VaccineController],
  providers: [VaccineService],
  exports: [VaccineService],
})
export class VaccineModule {}
