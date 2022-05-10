import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { IdParams } from "src/common";
import { HealthRecord } from "src/entities/health_service/health-record.entity";
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
}
