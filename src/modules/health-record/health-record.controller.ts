import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { HealthRecord } from "src/entities/health_service/health-record.entity";
import { HealthService } from "src/entities/health_service/health-service.entity";
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

  @Post()
  async create(@Body() body: HealthRecordDTO): Promise<HealthService> {
    try {
      const healthRecord: Partial<HealthRecord> = {
        petId: body.petId,
        isPeriodical: body.isPeriodical,
        weight: body.weight,
        content: body.content,
        petStatus: body.petStatus,
        dateOfExam: body.dateOfExam,
        nextHealthCheck: body.nextHealthCheck,
      };
      const createHealthRecord = await this.healthRecordService.store(
        healthRecord,
      );

      return;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
