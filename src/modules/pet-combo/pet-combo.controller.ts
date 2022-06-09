import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PetCombo } from "src/entities/pet_service/pet-combo.entity";
import { ComboService } from "src/entities/service/combo-service.entity";
import { Combo } from "src/entities/service/combo.entity";
import { PaymentOrderMethodEnum } from "src/enum";
import { ComboServicesService } from "../combo-services/combo-services.service";
import { CombosService } from "../combos/combos.service";
import { PetComboServicesService } from "../pet-combo-services/pet-combo-services.service";
import { PetComboDTO } from "./dto/create-pet-combo.dto";
import { PetCombosService } from "./pet-combo.service";

@Controller("pet-combos")
@ApiTags("pet-combos")
export class PetComboController {
  constructor(
    private readonly petCombosService: PetCombosService,
    private combos: CombosService,
    private comboService: ComboServicesService,
    private petComboServicesService: PetComboServicesService,
  ) {}

  @Get()
  async getAll(): Promise<PetCombo[]> {
    return await this.petCombosService.index();
  }

  @Post()
  async create(@Body() body: PetComboDTO): Promise<PetCombo> {
    try {
      let next = 0;
      const combo: Partial<Combo> = await this.combos.findById(body.comboId);
      const comboService: Partial<ComboService[]> =
        await this.comboService.findComnoSericeByComboId(body.comboId);
      const petCombo: Partial<PetCombo> = {
        registerTime: body.registerTime,
        isCompleted: false,
        paymentMethod: PaymentOrderMethodEnum.CASH,
        orderTotal: combo.price,
        point: 200,
        petId: body.petId,
        branchId: body.branchId,
        comboId: body.comboId,
        breedingTransactionId: body.breedingTransactionId,
      };

      const createPetCombo = await this.petCombosService.store(petCombo);

      comboService.forEach(async (item, index) => {
        const ts = new Date(body.registerTime);
        ts.setDate(ts.getDate() + next);
        next += item.nextEvent;

        if (index == 0) {
          await this.petComboServicesService.store({
            workingTime: body.registerTime,
            isCompleted: false,
            serviceId: item.serviceId,
            petComboId: createPetCombo.id,
          });
        } else {
          await this.petComboServicesService.store({
            workingTime: ts,
            isCompleted: false,
            serviceId: item.serviceId,
            petComboId: createPetCombo.id,
          });
        }
      });
      return createPetCombo;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
