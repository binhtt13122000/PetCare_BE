import { forwardRef, Module } from "@nestjs/common";
import { PetCombosService } from "./pet-combo.service";
import { PetComboController } from "./pet-combo.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PetComboRepository } from "./pet-combo.repository";
import { CombosModule } from "../combos/combos.module";
import { ComboServiceModule } from "../combo-services/combo-services.module";
import { PetComboServicesModule } from "../pet-combo-services/pet-combo-services.module";
import { CustomerModule } from "../customer/customer.module";
import { PetOwnerModule } from "../pet-owner/pet-owner.module";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([PetComboRepository]),
    forwardRef(() => PetComboServicesModule),
    forwardRef(() => AuthModule),
    CombosModule,
    ComboServiceModule,
    CustomerModule,
    PetOwnerModule,
  ],
  providers: [PetCombosService],
  controllers: [PetComboController],
  exports: [PetCombosService],
})
export class PetComboModule {}
