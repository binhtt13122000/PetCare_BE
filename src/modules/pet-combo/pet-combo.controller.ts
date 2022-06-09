import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PetCombo } from "src/entities/pet_service/pet-combo.entity";
import { ComboService } from "src/entities/service/combo-service.entity";
import { Combo } from "src/entities/service/combo.entity";
import { CombosService } from "../combos/combos.service";
import { PetComboDTO } from "./dto/create-pet-combo.dto";
import { PetComboService } from "./pet-combo.service";

@Controller("pet-combos")
@ApiTags("pet-combos")
export class PetComboController {
  constructor(
    private readonly petComboService: PetComboService,
    private combos: CombosService,
  ) {}

  @Get()
  async getAll(): Promise<PetCombo[]> {
    return await this.petComboService.index();
  }

  @Post()
  async create(@Body() body: PetComboDTO): Promise<PetCombo> {
    try {
      const combo: Partial<Combo> = await this.combos.findById(body.comboId);
      // const comboService: Partial<ComboService[]> =
      return;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
