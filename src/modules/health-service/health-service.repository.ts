import { HealthService } from "src/entities/health_service/health-service.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(HealthService)
export class HealthServiceRepository extends Repository<HealthService> {}
