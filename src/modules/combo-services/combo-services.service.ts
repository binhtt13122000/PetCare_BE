import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { ComboService } from "src/entities/service/combo-service.entity";
import { ComboServicesRepository } from "./combo-services.repository";

@Injectable()
export class ComboServicesService extends BaseService<
  ComboService,
  ComboServicesRepository
> {
  constructor(
    private readonly comboServicesRepository: ComboServicesRepository,
  ) {
    super(comboServicesRepository);
  }

  async findComboServiceByComboId(comboId: number): Promise<ComboService[]> {
    return this.comboServicesRepository
      .createQueryBuilder("combo-services")
      .where("combo-services.comboId = :comboId", {
        comboId: comboId,
      })
      .getMany();
  }
}
