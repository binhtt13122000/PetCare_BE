import { Module } from "@nestjs/common";
import { PetsService } from "./pets.service";
import { PetsController } from "./pets.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PetsRepository } from "./pets.repository";

@Module({
  imports: [TypeOrmModule.forFeature([PetsRepository])],
  controllers: [PetsController],
  providers: [PetsService],
  exports: [PetsService],
})
export class PetsModule {}
