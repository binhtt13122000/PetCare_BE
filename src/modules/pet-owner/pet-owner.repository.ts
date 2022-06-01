import { PetOwner } from "src/entities/pet_service/pet-owner.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(PetOwner)
export class PetOwnerRepository extends Repository<PetOwner> {}
