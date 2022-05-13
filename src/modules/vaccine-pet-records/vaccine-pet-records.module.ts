import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VaccinePetRecordsController } from "./vaccine-pet-records.controller";
import { VaccinePetRecordsRepository } from "./vaccine-pet-records.repository";
import { VaccinePetRecordsService } from "./vaccine-pet-records.service";

@Module({
  imports: [TypeOrmModule.forFeature([VaccinePetRecordsRepository])],
  controllers: [VaccinePetRecordsController],
  providers: [VaccinePetRecordsService],
  exports: [VaccinePetRecordsService],
})
export class VaccinePetRecordsModule {}
