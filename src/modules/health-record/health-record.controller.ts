import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from "@nestjs/common";

import { ApiTags } from "@nestjs/swagger";
import { IdParams } from "src/common";
import { HealthRecord } from "src/entities/health_service/health-record.entity";
import { HealthRecordDTO } from "./dto/create-health-record.dto";
import { HealthRecordService } from "./health-record.service";

@Controller("health-record")
@ApiTags("health-record")
export class HealthRecordController {
  constructor(private readonly healthRecordService: HealthRecordService) {}

  @Get()
  async getAll(): Promise<HealthRecord[]> {
    try {
      return await this.healthRecordService.index();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(":id")
  async getOne(@Param() params: IdParams): Promise<HealthRecord> {
    try {
      return await this.healthRecordService.findById(params.id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Post("health-record")
  async create(@Body() body: HealthRecordDTO): Promise<HealthRecord> {
    try {
      const healthRecord: Partial<HealthRecord> = {
        petId: body.petId,
        isPeriodical: body.isPeriodical,
        weight: body.weight,
        content: body.contentOfHealthRecord,
        petStatus: body.petStatusOfHealthRecord,
        dateOfExam: body.dateOfExam,
        nextHealthCheck: body.nextHealthCheck,
      };
      return await this.healthRecordService.store(
        new HealthRecord(healthRecord),
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
