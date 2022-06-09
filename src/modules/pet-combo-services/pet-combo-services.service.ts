import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { PetComboService } from "src/entities/pet_service/pet-combo-service.entity";
import { PetComboServiceRepository } from "./pet-combo-services.repository";

@Injectable()
export class PetComboServicesService extends BaseService<
  PetComboService,
  PetComboServiceRepository
> {
  constructor(
    private readonly petComboServiceRepository: PetComboServiceRepository,
  ) {
    super(petComboServiceRepository);
  }
}
