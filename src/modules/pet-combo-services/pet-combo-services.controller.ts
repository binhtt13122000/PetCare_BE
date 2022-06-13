import { Body, Controller, Put, NotFoundException } from "@nestjs/common";
import { PetComboService } from "src/entities/pet_service/pet-combo-service.entity";
import { PetComboServicesService } from "./pet-combo-services.service";
import { UpdatePetComboServiceDTO } from "./dtos/update-pet-combo-service.dto";
import { ApiTags } from "@nestjs/swagger";

@Controller("pet-combo-services")
@ApiTags("pet-combo-services")
export class PetComboServicesController {
  constructor(
    private readonly petComboServicesService: PetComboServicesService,
  ) {}

  @Put()
  async update(
    @Body() body: UpdatePetComboServiceDTO,
  ): Promise<PetComboService> {
    const petComboService = this.petComboServicesService.findById(body.id);
    if (!petComboService) {
      throw new NotFoundException("not found");
    }
    return this.petComboServicesService.update(body.id, {
      ...petComboService,
      ...body,
    });
  }
}
