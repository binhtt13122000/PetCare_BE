import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PetComboServicesController } from "./pet-combo-services.controller";
import { PetComboServiceRepository } from "./pet-combo-services.repository";
import { PetComboServicesService } from "./pet-combo-services.service";

@Module({
  imports: [TypeOrmModule.forFeature([PetComboServiceRepository])],
  controllers: [PetComboServicesController],
  providers: [PetComboServicesService],
  exports: [PetComboServicesService],
})
export class PetComboServicesModule {}
