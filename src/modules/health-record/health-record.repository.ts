import { HealthRecord } from "src/entities/health_service/health-record.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(HealthRecord)
export class HealthRecordRepository extends Repository<HealthRecord> {}
