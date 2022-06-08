import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PetCombo } from "src/entities/pet_service/pet-combo.entity";
import { PetComboService } from "./pet-combo.service";

@Controller("pet-combos")
@ApiTags("pet-combos")
export class PetComboController {
  constructor(private readonly petComboService: PetComboService) {}

  @Get()
  async getAll(): Promise<PetCombo[]> {
    return await this.petComboService.index();
  }
}
