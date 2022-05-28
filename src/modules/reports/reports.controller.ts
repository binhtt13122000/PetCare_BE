import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { ReportsService } from "./reports.service";
import { Report } from "src/entities/user_management_service/report.entity";
import { CreateReportDTO } from "./dtos/create-report.dto";
import { ApiTags } from "@nestjs/swagger";

@Controller("reports")
@ApiTags("reports")
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  async createReport(@Body() body: CreateReportDTO): Promise<Report> {
    try {
      return await this.reportsService.store(new Report(body));
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
