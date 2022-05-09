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
  async create(@Body() body: HealthRecordDTO): Promise<HealthRecord> {
    try {
      return this.healthRecordService.store(body);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
