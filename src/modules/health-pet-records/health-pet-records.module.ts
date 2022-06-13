import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HealthPetRecordsController } from "./health-pet-records.controller";
import { HealthPetRecordsRepository } from "./health-pet-records.repository";
import { HealthPetRecordsService } from "./health-pet-records.service";

@Module({
  imports: [TypeOrmModule.forFeature([HealthPetRecordsRepository])],
  controllers: [HealthPetRecordsController],
  providers: [HealthPetRecordsService],
  exports: [HealthPetRecordsService],
})
export class HealthPetRecordsModule {}
