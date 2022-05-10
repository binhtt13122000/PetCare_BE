import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HealthRecordController } from "./health-record.controller";
import { HealthRecordRepository } from "./health-record.repository";
import { HealthRecordService } from "./health-record.service";

@Module({
  imports: [TypeOrmModule.forFeature([HealthRecordRepository])],
  controllers: [HealthRecordController],
  providers: [HealthRecordService],
  exports: [HealthRecordService],
})
export class HealthRecordModule {}
