import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  HttpException,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Combo } from "src/entities/service/combo.entity";
import { CombosService } from "./combos.service";
import { CreateComboDTO } from "./dtos/create-combo.dto";
import { UpdateComboDTO } from "./dtos/update-combo.dto";

@Controller("combos")
@ApiTags("combos")
export class CombosController {
  constructor(private readonly combosService: CombosService) {}

  @Get()
  async getAll(): Promise<Combo[]> {
    return await this.combosService.index();
  }

  @Get(":id")
  async getOne(@Param("id") id: number): Promise<Combo> {
    return await this.combosService.findOne(id);
  }

  @Post()
  async create(@Body() body: CreateComboDTO): Promise<Combo> {
    try {
      return await this.combosService.store(body);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Put()
  async update(@Body() body: UpdateComboDTO): Promise<Combo> {
    try {
      const combo = await this.combosService.findById(body.id);
      if (!combo) {
        throw new NotFoundException("Not found");
      }
      const instance = await this.combosService.findById(body.id);
      Object.assign(instance, body);
      return instance.save();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
