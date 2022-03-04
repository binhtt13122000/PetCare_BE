import { EntityRepository, Repository } from "typeorm";
import { Vaccine } from "src/entities/vaccine.entity";

@EntityRepository(Vaccine)
export class VaccineRepository extends Repository<Vaccine> {}
