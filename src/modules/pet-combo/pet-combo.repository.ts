import { EntityRepository, Repository } from "typeorm";
import { PetCombo } from "src/entities/pet_service/pet-combo.entity";

@EntityRepository(PetCombo)
export class PetComboRepository extends Repository<PetCombo> {}
