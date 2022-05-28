import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { ServiceFee } from "src/entities/service/service-fee.entity";
import { ServiceFeesRepository } from "./service-fees.repository";

@Injectable()
export class ServiceFeesService extends BaseService<
  ServiceFee,
  ServiceFeesRepository
> {
  constructor(private readonly serviceFeesRepository: ServiceFeesRepository) {
    super(serviceFeesRepository);
  }

  getServiceFeesByService(serviceId: number): Promise<ServiceFee[]> {
    return this.serviceFeesRepository.find({
      relations: ["service"],
      where: {
        serviceId: serviceId,
      },
      order: {
        price: "ASC",
      },
    });
  }
}
