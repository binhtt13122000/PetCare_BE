import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { ComboService } from "src/entities/service/combo-service.entity";
import { ComboServiceRepository } from "./combo-service.repository";

@Injectable()
export class ComboServiceService extends BaseService<
  ComboService,
  ComboServiceRepository
> {
  constructor(private readonly comboServiceRepository: ComboServiceRepository) {
    super(comboServiceRepository);
  }
}
