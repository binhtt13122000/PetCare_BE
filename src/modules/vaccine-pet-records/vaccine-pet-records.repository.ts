import { VaccinePetRecord } from "src/entities/pet_service/vaccine-pet-record.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(VaccinePetRecord)
export class VaccinePetRecordsRepository extends Repository<VaccinePetRecord> {}
