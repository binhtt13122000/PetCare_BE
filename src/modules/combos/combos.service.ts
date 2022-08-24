import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { Combo } from "src/entities/service/combo.entity";
import { ComboTypeEnum } from "src/enum";
import { CombosRepository } from "./combos.repository";

@Injectable()
export class CombosService extends BaseService<Combo, CombosRepository> {
  constructor(private readonly combosRepository: CombosRepository) {
    super(combosRepository);
  }

  getAll(): Promise<Combo[]> {
    return this.combosRepository.find({
      relations: ["comboServices", "comboServices.service"],
    });
  }

  findOne(id: number): Promise<Combo> {
    return this.combosRepository.findOne({
      where: {
        id: id,
      },
      relations: ["comboServices", "comboServices.service"],
    });
  }

  getByType(type: ComboTypeEnum): Promise<Combo[]> {
    return this.combosRepository.find({
      where: {
        type: type,
      },
    });
  }

  getOneWithComboServices(id: number): Promise<Combo> {
    return this.combosRepository.findOne({
      where: { id: id },
      relations: ["comboServices"],
    });
  }
}
