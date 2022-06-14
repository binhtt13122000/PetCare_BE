import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { HealthPetRecordsRepository } from "./health-pet-records.repository";
import { HealthPetRecord } from "src/entities/pet_service/health-pet-record.entity";
import { HealthPetRecordEnum } from "src/enum/index";

@Injectable()
export class HealthPetRecordsService extends BaseService<
  HealthPetRecord,
  HealthPetRecordsRepository
> {
  constructor(
    private readonly healthPetRecordsRepository: HealthPetRecordsRepository,
  ) {
    super(healthPetRecordsRepository);
  }

  getHealthPetRecordsByPetId(
    petId: number,
    type: HealthPetRecordEnum,
  ): Promise<HealthPetRecord[]> {
    return this.healthPetRecordsRepository.find({
      where: {
        petId: petId,
        type: type,
      },
      relations: ["vaccine", "branch"],
    });
  }
}
