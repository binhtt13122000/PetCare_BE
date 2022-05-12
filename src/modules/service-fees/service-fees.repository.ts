import { ServiceFee } from "src/entities/service/service-fee.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(ServiceFee)
export class ServiceFeesRepository extends Repository<ServiceFee> {}
