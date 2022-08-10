import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { Service } from "src/entities/service/service.entity";
import { ServiceRepository } from "./services.repository";

@Injectable()
export class ShopService extends BaseService<Service, ServiceRepository> {
  constructor(private readonly serviceRepository: ServiceRepository) {
    super(serviceRepository);
  }

  getAll(speciesId: number): Promise<Service[]> {
    if (speciesId) {
      return this.serviceRepository.find({
        relations: ["serviceFees", "vaccine"],
        where: {
          speciesId: speciesId,
        },
      });
    } else {
      return this.serviceRepository.find({
        relations: ["serviceFees", "vaccine"],
      });
    }
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
