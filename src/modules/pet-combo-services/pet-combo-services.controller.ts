import { Body, Controller, Put, NotFoundException, Get } from "@nestjs/common";
import { PetComboService } from "src/entities/pet_service/pet-combo-service.entity";
import { PetComboServicesService } from "./pet-combo-services.service";
import { UpdatePetComboServiceDTO } from "./dtos/update-pet-combo-service.dto";
import { ApiTags } from "@nestjs/swagger";
import {
  getSpecificDateAgoWithNumberDays,
  getSpecificDateFutureWithNumberDays,
} from "src/common/utils";
import { NotificationPetComboServiceDTO } from "./dtos/notification-pet-combo-service.dto";

@Controller("pet-combo-services")
@ApiTags("pet-combo-services")
export class PetComboServicesController {
  constructor(
    private readonly petComboServicesService: PetComboServicesService,
  ) {}

  @Get()
  async getOne(): Promise<NotificationPetComboServiceDTO[]> {
    const DAYS = 3;
    const dateWithThreeDaysFuture = getSpecificDateFutureWithNumberDays(DAYS);
    const currentDate = getSpecificDateAgoWithNumberDays(0);
    return await this.petComboServicesService.getServiceInComboAvailableInSpecificRangeDate(
      currentDate.toDateString(),
      dateWithThreeDaysFuture.toDateString(),
    );
  }

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
