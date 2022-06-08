import { Module } from "@nestjs/common";
import { PetComboService } from "./pet-combo.service";
import { PetComboController } from "./pet-combo.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PetComboRepository } from "./pet-combo.repository";

@Module({
  imports: [TypeOrmModule.forFeature([PetComboRepository])],
  providers: [PetComboService],
  controllers: [PetComboController],
  exports: [PetComboService],
})
export class PetComboModule {}
