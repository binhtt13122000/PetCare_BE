import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { PetComboService } from "src/entities/pet_service/pet-combo-service.entity";
import { In } from "typeorm";
import { NotificationPetComboServiceDTO } from "./dtos/notification-pet-combo-service.dto";
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

  getPetComboServicesByPetCombIds(
    petComboIds: number[],
  ): Promise<PetComboService[]> {
    return this.petComboServiceRepository.find({
      where: {
        petComboId: In(petComboIds),
      },
    });
  }

  getServiceInComboAvailableInSpecificRangeDate(
    startDate: string,
    endDate: string,
  ): Promise<NotificationPetComboServiceDTO[]> {
    return this.petComboServiceRepository
      .createQueryBuilder("pet-combo-services")
      .leftJoinAndSelect("pet-combo-services.petCombo", "petCombo")
      .leftJoinAndSelect("pet-combo-services.service", "service")
      .leftJoinAndSelect("petCombo.pet", "pet")
      .leftJoinAndSelect("pet.petOwners", "pet_owners")
      .leftJoinAndSelect("pet_owners.customer", "customer")
      .where(
        "pet-combo-services.workingTime >= :startDate and pet-combo-services.workingTime <= :endDate and pet-combo-services.isCompleted = :isCompleted  and pet_owners.isCurrentOwner = :isCurrentOwner",
        {
          isCompleted: false,
          startDate: startDate,
          endDate: endDate,
          isCurrentOwner: true,
        },
      )
      .select(
        'pet-combo-services.id, pet-combo-services.workingTime, pet-combo-services.isCompleted, service.name, petCombo.id as "petComboId", petCombo.petId, pet.id, pet_owners.customerId, customer.phoneNumber',
      )
      .execute();
  }
}
