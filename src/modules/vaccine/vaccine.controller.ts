import {
  Controller,
  Post,
  Body,
  Put,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { VaccineService } from "./vaccine.service";
import { Vaccine } from "../../entities/pet_service/vaccine.entity";
import { ApiTags } from "@nestjs/swagger";
import { CreateVaccineDTO } from "./dto/create-vaccine.dto";
import { UpdateVaccineDTO } from "./dto/update-vaccine.dto";

@ApiTags("vaccine")
@Controller("vaccine")
export class VaccineController {
  constructor(private readonly vaccineService: VaccineService) {}

  @Post()
  async create(@Body() body: CreateVaccineDTO): Promise<Vaccine> {
    try {
      return this.vaccineService.store(body);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Put()
  async update(@Body() body: UpdateVaccineDTO): Promise<Vaccine> {
    try {
      return await this.vaccineService.update(body.id, body);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
