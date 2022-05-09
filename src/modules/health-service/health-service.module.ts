import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SharedModule } from "src/shared/shared.module";
import { HealthRecordModule } from "../health-record/health-record.module";
import { HealthServiceController } from "./health-service.controller";
import { HealthServiceRepository } from "./health-service.repository";
import { HealthServices } from "./health-service.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([HealthServiceRepository]),
    HealthRecordModule,
    SharedModule,
  ],
  controllers: [HealthServiceController],
  providers: [HealthServices],
  exports: [HealthServices],
})
export class HealthServiceModule {}
