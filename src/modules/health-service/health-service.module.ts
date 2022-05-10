import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HealthServiceController } from "./health-service.controller";
import { HealthServiceRepository } from "./health-service.repository";
import { HealthServices } from "./health-service.service";

@Module({
  imports: [TypeOrmModule.forFeature([HealthServiceRepository])],
  controllers: [HealthServiceController],
  providers: [HealthServices],
  exports: [HealthServices],
})
export class HealthServiceModule {}
