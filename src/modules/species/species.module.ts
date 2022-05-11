import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SpeciesController } from "./species.controller";
import { SpeciesService } from "./species.service";
import { SpeciesRepository } from "./speices.repository";

@Module({
  imports: [TypeOrmModule.forFeature([SpeciesRepository])],
  controllers: [SpeciesController],
  providers: [SpeciesService],
  exports: [SpeciesService],
})
export class SpeciesModule {}
