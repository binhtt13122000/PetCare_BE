import {
  Body,
  Controller,
  Put,
  NotFoundException,
  Get,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { PetComboService } from "src/entities/pet_service/pet-combo-service.entity";
import { PetComboServicesService } from "./pet-combo-services.service";
import { UpdatePetComboServiceDTO } from "./dtos/update-pet-combo-service.dto";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import {
  getSpecificDateAgoWithNumberDays,
  getSpecificDateFutureWithNumberDays,
} from "src/common/utils";
import { NotificationPetComboServiceDTO } from "./dtos/notification-pet-combo-service.dto";
import { PetCombosService } from "../pet-combo/pet-combo.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { uploadService } from "src/external/uploadFile.service";

@Controller("pet-combo-services")
@ApiTags("pet-combo-services")
export class PetComboServicesController {
  constructor(
    private readonly petComboServicesService: PetComboServicesService,
    private readonly petCombosService: PetCombosService,
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
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("file"))
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UpdatePetComboServiceDTO,
  ): Promise<PetComboService> {
    const { isAllCompleted, ...rest } = body;
    const petComboService = await this.petComboServicesService.findById(
      body.id,
    );
    let evidence: string = null;
    if (file) {
      const { url } = await uploadService.uploadFile(file);
      evidence = url;
    }
    if (!petComboService) {
      throw new NotFoundException("not found");
    }
    const petCombo = await this.petCombosService.findById(
      petComboService.petComboId,
    );
    if (!petCombo) {
      throw new NotFoundException("not found pet combo");
    }
    const updatePetComboService = await this.petComboServicesService.update(
      body.id,
      {
        ...petComboService,
        ...rest,
        evidence: evidence,
      },
    );
    if (isAllCompleted) {
      await this.petCombosService.update(petCombo.id, {
        ...petCombo,
        isCompleted: true,
      });
    }
    return updatePetComboService;
  }
}
