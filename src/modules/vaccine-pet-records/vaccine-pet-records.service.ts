import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { VaccinePetRecord } from "src/entities/pet_service/vaccine-pet-record.entity";
import { VaccinePetRecordsRepository } from "./vaccine-pet-records.repository";

@Injectable()
export class VaccinePetRecordsService extends BaseService<
  VaccinePetRecord,
  VaccinePetRecordsRepository
> {
  constructor(
    private readonly vaccinePetRecordsRepository: VaccinePetRecordsRepository,
  ) {
    super(vaccinePetRecordsRepository);
  }

  getVaccinePetRecordsByPetId(petId: number): Promise<VaccinePetRecord[]> {
    return this.vaccinePetRecordsRepository.find({
      where: {
        petId: petId,
      },
      relations: ["vaccine"],
    });
  }
}
