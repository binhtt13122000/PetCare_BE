import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { SpeciesController } from "./species.controller";
import { SpeciesService } from "./species.service";
import { SpeciesRepository } from "./speices.repository";

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([SpeciesRepository])],
  controllers: [SpeciesController],
  providers: [SpeciesService],
  exports: [SpeciesService],
})
export class SpeciesModule {}
