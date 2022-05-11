import { Species } from "src/entities/pet_service/species.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Species)
export class SpeciesRepository extends Repository<Species> {}
