import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { Breed } from "src/entities/pet_service/breed.entity";
import { BreedsRepository } from "./breeds.repository";

@Injectable()
export class BreedsService extends BaseService<Breed, BreedsRepository> {
  constructor(private readonly breedsRepository: BreedsRepository) {
    super(breedsRepository);
  }
}
