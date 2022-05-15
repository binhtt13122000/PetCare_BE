import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { IdParams } from "src/common";
import { VaccinePetRecord } from "src/entities/pet_service/vaccine-pet-record.entity";
import { DeleteResult } from "typeorm";
import { CreateVaccinePetRecordDTO } from "./dto/create-vaccine-pet-record.dto";
import { UpdateVaccinePetRecordDTO } from "./dto/update-vaccine-pet-record.dto";
import { VaccinePetRecordsService } from "./vaccine-pet-records.service";

@Controller("vaccine-pet-records")
@ApiTags("vaccine-pet-records")
export class VaccinePetRecordsController {
  constructor(
    private readonly vaccinePetRecordsService: VaccinePetRecordsService,
  ) {}

  @Get()
  async getAll(): Promise<VaccinePetRecord[]> {
    try {
      return await this.vaccinePetRecordsService.index();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(":id")
  async getOne(@Param() params: IdParams): Promise<VaccinePetRecord> {
    try {
      return await this.vaccinePetRecordsService.findById(params.id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(":id")
  async delete(@Param() params: IdParams): Promise<DeleteResult> {
    try {
      return await this.vaccinePetRecordsService.delete(params.id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  async create(
    @Body() body: CreateVaccinePetRecordDTO,
  ): Promise<VaccinePetRecord> {
    try {
      return await this.vaccinePetRecordsService.store(
        new VaccinePetRecord(body),
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Put()
  async update(
    @Body() body: UpdateVaccinePetRecordDTO,
  ): Promise<VaccinePetRecord> {
    try {
      return await this.vaccinePetRecordsService.update(body.id, body);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
