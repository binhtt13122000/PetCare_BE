import { Breed } from "src/entities/pet_service/breed.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Breed)
export class BreedsRepository extends Repository<Breed> {}
