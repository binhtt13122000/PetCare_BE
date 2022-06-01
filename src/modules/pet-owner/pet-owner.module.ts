import { Module } from "@nestjs/common";
import { PetOwnerService } from "./pet-owner.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PetOwnerRepository } from "./pet-owner.repository";

@Module({
  imports: [TypeOrmModule.forFeature([PetOwnerRepository])],
  providers: [PetOwnerService],
  exports: [PetOwnerService],
})
export class PetOwnerModule {}
