import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SharedModule } from "src/shared/shared.module";
import { UserModule } from "../users/user.module";
import { PetComboServicesController } from "./pet-combo-services.controller";
import { PetComboServiceRepository } from "./pet-combo-services.repository";
import { PetComboServicesService } from "./pet-combo-services.service";
import { PetComboModule } from "../pet-combo/pet-combo.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([PetComboServiceRepository]),
    forwardRef(() => PetComboModule),
    UserModule,
    SharedModule,
  ],
  controllers: [PetComboServicesController],
  providers: [PetComboServicesService],
  exports: [PetComboServicesService],
})
export class PetComboServicesModule {}
