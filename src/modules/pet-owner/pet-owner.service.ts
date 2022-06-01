import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { PetOwner } from "src/entities/pet_service/pet-owner.entity";
import { UpdateResult } from "typeorm";
import { PetOwnerRepository } from "./pet-owner.repository";

@Injectable()
export class PetOwnerService extends BaseService<PetOwner, PetOwnerRepository> {
  constructor(private readonly petOwnerRepository: PetOwnerRepository) {
    super(petOwnerRepository);
  }

  updateAllByPetId(petId: number): Promise<UpdateResult> {
    return this.petOwnerRepository
      .createQueryBuilder()
      .update(PetOwner)
      .set({ isCurrentOwner: false })
      .where({
        petId: petId,
      })
      .execute();
  }
}
