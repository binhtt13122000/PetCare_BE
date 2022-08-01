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
  UseGuards,
} from "@nestjs/common";
import { VaccineService } from "./vaccine.service";
import { ApiTags } from "@nestjs/swagger";
import { CreateVaccineDTO } from "./dto/create-vaccine.dto";
import { UpdateVaccineDTO } from "./dto/update-vaccine.dto";
import { Vaccine } from "src/entities/pet_service/vaccine.entity";
import { IdParams } from "src/common";
import { RolesGuard } from "../auth/guards/roles.guard";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { hasRoles } from "../auth/decorator/roles.decorator";
import { RoleEnum } from "src/enum";

@ApiTags("vaccine")
@Controller("vaccine")
@UseGuards(JwtAuthGuard, RolesGuard)
export class VaccineController {
  constructor(private readonly vaccineService: VaccineService) {}

  @hasRoles(RoleEnum.ADMIN)
  @Post()
  async create(@Body() body: CreateVaccineDTO): Promise<Vaccine> {
    try {
      return this.vaccineService.store(body);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @hasRoles(RoleEnum.ADMIN)
  @Put()
  async update(@Body() body: UpdateVaccineDTO): Promise<Vaccine> {
    try {
      return await this.vaccineService.update(body.id, body);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @hasRoles(RoleEnum.ADMIN)
  @Patch("change-status/:id")
  async changeStatus(@Param() param: IdParams): Promise<Vaccine> {
    try {
      const vaccine: Vaccine = await this.vaccineService.findById(param.id);
      return this.vaccineService.update(param.id, {
        ...vaccine,
        isActive: !vaccine.isActive,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @hasRoles(RoleEnum.ADMIN)
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
