import { HealthPetRecord } from "src/entities/pet_service/health-pet-record.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(HealthPetRecord)
export class HealthPetRecordsRepository extends Repository<HealthPetRecord> {}
