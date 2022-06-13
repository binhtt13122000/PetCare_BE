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
  Query,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { IdParams } from "src/common";
import { DeleteResult } from "typeorm";
import { CreateHealthPetRecordDTO } from "./dto/create-health-pet-record.dto";
import GetHealthPetRecordQuery from "./dto/get-health-pet-record.dto";
import { UpdateHealthPetRecordDTO } from "./dto/update-health-pet-record.dto";
import { HealthPetRecordsService } from "./health-pet-records.service";
import { HealthPetRecord } from "src/entities/pet_service/health-pet-record.entity";

@Controller("health-pet-records")
@ApiTags("health-pet-records")
export class HealthPetRecordsController {
  constructor(
    private readonly healthPetRecordsService: HealthPetRecordsService,
  ) {}

  @Get()
  async getAll(
    @Query()
    query: GetHealthPetRecordQuery,
  ): Promise<HealthPetRecord[]> {
    try {
      return await this.healthPetRecordsService.getHealthPetRecordsByPetId(
        query.petId,
        query.type,
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(":id")
  async getOne(@Param() params: IdParams): Promise<HealthPetRecord> {
    try {
      return await this.healthPetRecordsService.findById(params.id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(":id")
  async delete(@Param() params: IdParams): Promise<DeleteResult> {
    try {
      return await this.healthPetRecordsService.delete(params.id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  async create(
    @Body() body: CreateHealthPetRecordDTO,
  ): Promise<HealthPetRecord> {
    try {
      return await this.healthPetRecordsService.store(
        new HealthPetRecord(body),
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Put()
  async update(
    @Body() body: UpdateHealthPetRecordDTO,
  ): Promise<HealthPetRecord> {
    try {
      return await this.healthPetRecordsService.update(body.id, body);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
