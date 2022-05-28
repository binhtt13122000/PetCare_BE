import { Module } from "@nestjs/common";
import { ReportsService } from "./reports.service";
import { ReportsController } from "./reports.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReportsRepository } from "./reports.repository";

@Module({
  imports: [TypeOrmModule.forFeature([ReportsRepository])],
  providers: [ReportsService],
  controllers: [ReportsController],
  exports: [ReportsService],
})
export class ReportsModule {}
