import { Service } from "src/entities/service/service.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Service)
export class ServiceRepository extends Repository<Service> {}
