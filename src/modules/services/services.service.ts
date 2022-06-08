import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { Service } from "src/entities/service/service.entity";
import { ServiceRepository } from "./services.repository";

@Injectable()
export class ShopService extends BaseService<Service, ServiceRepository> {
  constructor(private readonly serviceRepository: ServiceRepository) {
    super(serviceRepository);
  }

  getAll(): Promise<Service[]> {
    return this.serviceRepository.find({
      relations: ["serviceFees"],
    });
  }
}
