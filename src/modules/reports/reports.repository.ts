import { Report } from "src/entities/user_management_service/report.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Report)
export class ReportsRepository extends Repository<Report> {}
