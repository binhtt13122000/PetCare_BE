import { EntityRepository, Repository } from "typeorm";
import { Service } from "../../entities/service/service.entity";

@EntityRepository(Service)
export class ServiceRepository extends Repository<Service> {}
