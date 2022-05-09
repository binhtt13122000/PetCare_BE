import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { HealthRecord } from "src/entities/health_service/health-record.entity";
import { HealthRecordRepository } from "./health-record.repository";

@Injectable()
export class HealthRecordService extends BaseService<
  HealthRecord,
  HealthRecordRepository
> {
  constructor(private readonly healthRecordRepository: HealthRecordRepository) {
    super(healthRecordRepository);
  }
}
