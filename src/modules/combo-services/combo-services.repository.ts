import { ComboService } from "src/entities/service/combo-service.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(ComboService)
export class ComboServicesRepository extends Repository<ComboService> {}
