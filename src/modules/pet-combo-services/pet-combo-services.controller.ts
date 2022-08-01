import {
  Body,
  Controller,
  Put,
  NotFoundException,
  Get,
  UseInterceptors,
  UploadedFile,
  UseGuards,
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
import { ShopService } from "../services/services.service";
import { HealthPetRecordEnum, ServiceType } from "src/enum";
import { HealthPetRecordsService } from "../health-pet-records/health-pet-records.service";
import { HealthPetRecord } from "../../entities/pet_service/health-pet-record.entity";
import { AxiosService } from "src/shared/axios/axios.service";
import { PetsService } from "../pets/pets.service";
import { RolesGuard } from "../auth/guards/roles.guard";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller("pet-combo-services")
@ApiTags("pet-combo-services")
@UseGuards(JwtAuthGuard, RolesGuard)
export class PetComboServicesController {
  constructor(
    private readonly petComboServicesService: PetComboServicesService,
    private readonly petCombosService: PetCombosService,
    private readonly shopService: ShopService,
    private readonly healthPetRecordsService: HealthPetRecordsService,
    private readonly axiosService: AxiosService,
    private readonly petService: PetsService,
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
    const { isAllCompleted, microchip, ...rest } = body;
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
    if (updatePetComboService.isCompleted) {
      const service = await this.shopService.findById(
        updatePetComboService.serviceId,
      );
      if (service) {
        const pet = await this.petService.getOne(petCombo.petId, true);
        switch (service.type) {
          case ServiceType.VACCINE:
            await this.healthPetRecordsService.store(
              new HealthPetRecord({
                type: HealthPetRecordEnum.VACCINE,
                dateOfInjection: updatePetComboService.realTime,
                petId: petCombo.petId,
                branchId: petCombo.branchId,
                vaccineType: service.name,
                vaccineId: service.vaccineId,
              }),
            );
            if (pet.specialMarkings) {
              await this.axiosService.setData(
                pet,
                "UPDATE",
                "The dog has been given a new vaccine",
                pet.specialMarkings,
              );
            }
            break;
          case ServiceType.HELMINTHIC:
            await this.healthPetRecordsService.store(
              new HealthPetRecord({
                type: HealthPetRecordEnum.HELMINTHIC,
                dateOfInjection: updatePetComboService.realTime,
                petId: petCombo.petId,
                branchId: petCombo.branchId,
              }),
            );
            if (pet.specialMarkings) {
              await this.axiosService.setData(
                pet,
                "UPDATE",
                "The dog has been given a new deworming",
                pet.specialMarkings,
              );
            }
            break;
          case ServiceType.TICKS:
            await this.healthPetRecordsService.store(
              new HealthPetRecord({
                type: HealthPetRecordEnum.TICKS,
                dateOfInjection: updatePetComboService.realTime,
                petId: petCombo.petId,
                branchId: petCombo.branchId,
              }),
            );
            if (pet.specialMarkings) {
              await this.axiosService.setData(
                pet,
                "UPDATE",
                "The dog has been given a new tick treatment",
                pet.specialMarkings,
              );
            }
            break;
          case ServiceType.MICROCHIP:
            if (microchip) {
              this.petService.createChain({
                id: petCombo.petId,
                specialMarkings: microchip,
                initDate: updatePetComboService.realTime,
              });
            }
            break;
          default:
            break;
        }
      }
    }
    return updatePetComboService;
  }
}
