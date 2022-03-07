import { EntityRepository, Repository } from "typeorm";
import { Pet } from "src/entities/pet.entity";

@EntityRepository(Pet)
export class PetsRepository extends Repository<Pet> {}
