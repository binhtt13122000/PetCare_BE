import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PetCombo } from "src/entities/pet_service/pet-combo.entity";
import { PetCombosService } from "./pet-combo.service";

@Controller("pet-combos")
@ApiTags("pet-combos")
export class PetComboController {
  constructor(private readonly petCombosService: PetCombosService) {}

  @Get()
  async getAll(): Promise<PetCombo[]> {
    return await this.petCombosService.index();
  }

  @Get(":id")
  async getOne(@Param("id") id: number): Promise<PetCombo> {
    return await this.petCombosService.getOne(id);
  }

  @Get("pet/:id")
  async getByPet(@Param("id") id: number): Promise<PetCombo[]> {
    return await this.petCombosService.getPetComboByPetId(id);
  }
}
