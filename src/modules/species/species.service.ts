import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { Species } from "src/entities/pet_service/species.entity";
import { SpeciesRepository } from "./speices.repository";

@Injectable()
export class SpeciesService extends BaseService<Species, SpeciesRepository> {
  constructor(private readonly speciesRepository: SpeciesRepository) {
    super(speciesRepository);
  }

  async getSpeciesByStatus(isActive: boolean): Promise<Species[]> {
    try {
      return await this.speciesRepository.find({
        where: {
          isActive: isActive,
        },
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
