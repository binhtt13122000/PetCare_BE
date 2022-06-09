import { PetComboService } from "src/entities/pet_service/pet-combo-service.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(PetComboService)
export class PetComboServiceRepository extends Repository<PetComboService> {}
