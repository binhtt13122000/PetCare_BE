import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { HealthService } from "src/entities/health_service/health-service.entity";
import { HealthServiceRepository } from "./health-service.repository";

@Injectable()
export class HealthServices extends BaseService<
  HealthService,
  HealthServiceRepository
> {
  constructor(
    private readonly healthServiceRepository: HealthServiceRepository,
  ) {
    super(healthServiceRepository);
  }
}
