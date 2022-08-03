import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { Service } from "src/entities/service/service.entity";
import { ServiceType } from "src/enum";
import { Not } from "typeorm";
import { ServiceRepository } from "./services.repository";

@Injectable()
export class ShopService extends BaseService<Service, ServiceRepository> {
  constructor(private readonly serviceRepository: ServiceRepository) {
    super(serviceRepository);
  }

  getAll(): Promise<Service[]> {
    return this.serviceRepository.find({
      relations: ["serviceFees", "vaccine"],
    });
  }

  getAllExceptBreed(): Promise<Service[]> {
    return this.serviceRepository.find({
      where: {
        type: Not(ServiceType.BREED),
      },
      relations: ["serviceFees", "vaccine"],
    });
  }

  getOne(id: number): Promise<Service> {
    return this.serviceRepository.findOne({
      where: {
        id,
      },
      relations: ["vaccine"],
    });
  }
}
