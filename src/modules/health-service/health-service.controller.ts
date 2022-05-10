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
import { HealthRecordService } from "../health-record/health-record.service";
import { HealthRecordDTO } from "./dto/create-health-record.dto";
import { HealthServiceDTO } from "./dto/create-health-service.dto";

import { HealthServices } from "./health-service.service";

@Controller("health-service")
@ApiTags("health-service")
export class HealthServiceController {
  constructor(
    private readonly healthServices: HealthServices,
    private healthRecordService: HealthRecordService,
  ) {}

  @Get()
  async getAll(): Promise<HealthService[]> {
    try {
      return await this.healthServices.index();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Post("health-record")
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("file"))
  async create(
    @Body() body: HealthRecordDTO,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<HealthService> {
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

      const { url: evidence } = await uploadService.uploadFile(file);

      const createHealthService: Partial<HealthService> = {
        healthRecordId: createHealthRecord.id,
        evidence: evidence,
        serviceId: body.serviceId,
        price: body.price,
        content: body.content,
        petStatus: body.petStatus,
      };
      return await this.healthServices.store(
        new HealthService(createHealthService),
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("file"))
  async addServiceToHealthRecord(
    @Body() body: HealthServiceDTO,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<HealthService> {
    try {
      const { url: evidence } = await uploadService.uploadFile(file);

      const createHealthService: Partial<HealthService> = {
        evidence: evidence,
        serviceId: body.serviceId,
        price: body.price,
        content: body.content,
        petStatus: body.petStatus,
        healthRecordId: body.healthRecordId,
      };
      return await this.healthServices.store(
        new HealthService(createHealthService),
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
