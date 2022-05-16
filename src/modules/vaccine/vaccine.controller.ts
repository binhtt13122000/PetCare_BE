import {
  Controller,
  Post,
  Body,
  Put,
  HttpException,
  HttpStatus,
  Delete,
  Patch,
  Param,
} from "@nestjs/common";
import { VaccineService } from "./vaccine.service";
import { ApiTags } from "@nestjs/swagger";
import { CreateVaccineDTO } from "./dto/create-vaccine.dto";
import { UpdateVaccineDTO } from "./dto/update-vaccine.dto";
import { Vaccine } from "src/entities/pet_service/vaccine.entity";
import { IdParams } from "src/common";

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

  @Patch("/change-status")
  async changeStatus(id: number): Promise<Vaccine> {
    try {
      const vaccine: Vaccine = await this.vaccineService.findById(id);
      return this.vaccineService.update(id, {
        ...vaccine,
        isActive: !vaccine.isActive,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(":id")
  async delete(@Param() params: IdParams): Promise<Vaccine> {
    try {
      const vaccine: Vaccine = await this.vaccineService.findById(params.id);
      return this.vaccineService.update(params.id, {
        ...vaccine,
        isActive: false,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
