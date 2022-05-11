import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { Species } from "src/entities/pet_service/species.entity";
import { SpeciesRepository } from "./speices.repository";

@Injectable()
export class SpeciesService extends BaseService<Species, SpeciesRepository> {
  constructor(private readonly speciesRepository: SpeciesRepository) {
    super(speciesRepository);
  }
}
