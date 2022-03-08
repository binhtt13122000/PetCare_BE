import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { Pet } from "src/entities/pet.entity";
import { PetsRepository } from "./pets.repository";

@Injectable()
export class PetsService extends BaseService<Pet, PetsRepository> {
  constructor(private readonly petsRepository: PetsRepository) {
    super(petsRepository);
  }
}
