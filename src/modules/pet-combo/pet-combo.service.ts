import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { PetCombo } from "src/entities/pet_service/pet-combo.entity";
import { PetComboRepository } from "./pet-combo.repository";

@Injectable()
export class PetCombosService extends BaseService<
  PetCombo,
  PetComboRepository
> {
  constructor(private readonly petComboRepository: PetComboRepository) {
    super(petComboRepository);
  }

  getOne(id: number): Promise<PetCombo> {
    return this.petComboRepository.findOne({
      where: {
        id: id,
      },
      relations: ["petComboServices", "petComboServices.service"],
    });
  }

  getPetComboByPetId(petId: number): Promise<PetCombo[]> {
    return this.petComboRepository.find({
      where: {
        petId,
        isDraft: false,
      },
      order: {
        registerTime: "DESC",
      },
      relations: ["pet", "branch", "combo"],
    });
  }
}
