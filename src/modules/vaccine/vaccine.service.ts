import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { Vaccine } from "src/entities/pet_service/vaccine.entity";
import { VaccineRepository } from "./vaccine.repository";

@Injectable()
export class VaccineService extends BaseService<Vaccine, VaccineRepository> {
  constructor(private readonly vaccineRepository: VaccineRepository) {
    super(vaccineRepository);
  }
}
