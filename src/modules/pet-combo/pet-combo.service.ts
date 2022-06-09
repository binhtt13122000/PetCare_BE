import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { PetCombo } from "src/entities/pet_service/pet-combo.entity";
import { PetComboDTO } from "./dto/create-pet-combo.dto";
import { PetComboRepository } from "./pet-combo.repository";

@Injectable()
export class PetComboService extends BaseService<PetCombo, PetComboRepository> {
  constructor(private readonly petComboRepository: PetComboRepository) {
    super(petComboRepository);
  }

  async createPetCombo(petCombo: PetComboDTO): Promise<PetCombo> {
    return;
  }
}
