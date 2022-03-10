import { Module } from "@nestjs/common";
import { VaccineController } from "./vaccine.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VaccineRepository } from "./vaccine.repository";
import { VaccineService } from "./vaccine.service";
import { SharedModule } from "src/shared/shared.module";

@Module({
  imports: [TypeOrmModule.forFeature([VaccineRepository]), SharedModule],
  controllers: [VaccineController],
  providers: [VaccineService],
  exports: [VaccineService],
})
export class VaccineModule {}
