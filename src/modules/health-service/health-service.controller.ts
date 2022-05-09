import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { HealthRecord } from "src/entities/health_service/health-record.entity";
import { HealthService } from "src/entities/health_service/health-service.entity";
import { uploadService } from "src/external/uploadFile.service";
import { FileProducerService } from "src/shared/file/file.producer.service";
import { HealthRecordService } from "../health-record/health-record.service";

import { HealthServiceDTO } from "./dto/create-health-service.dto";

import { HealthServices } from "./health-service.service";

@Controller("health-service")
@ApiTags("health-service")
export class HealthServiceController {
  constructor(
    private readonly healthServices: HealthServices,
    private healthRecordService: HealthRecordService,
    private fileProducerService: FileProducerService,
  ) {}

  @Get()
  async getAll(): Promise<HealthService[]> {
    try {
      return await this.healthServices.index();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  async create(@Body() body: HealthServiceDTO): Promise<HealthService> {
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

      const createHealthRecord = await this.healthRecordService.store(
        new HealthRecord(healthRecord),
      );

      const createHealthService: Partial<HealthService> = {
        evidence: body.evidence,
        serviceId: body.serviceId,
        price: body.price,
        content: body.contentOfHealthService,
        petStatus: body.petStatusOfHealthService,
        healthRecordId: createHealthRecord.id,
      };
      return await this.healthServices.store(
        new HealthService(createHealthService),
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
