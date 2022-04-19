import { EntityRepository, Repository } from "typeorm";
import { Vaccine } from "src/entities/pet_service/vaccine.entity";

@EntityRepository(Vaccine)
export class VaccineRepository extends Repository<Vaccine> {}
