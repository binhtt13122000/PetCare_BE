import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { Report } from "src/entities/user_management_service/report.entity";
import { ReportsRepository } from "./reports.repository";

@Injectable()
export class ReportsService extends BaseService<Report, ReportsRepository> {
  constructor(private readonly reportsRepository: ReportsRepository) {
    super(reportsRepository);
  }
}
