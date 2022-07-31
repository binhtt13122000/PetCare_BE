import { HttpModule } from "@nestjs/axios";
import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { configService } from "src/config/config.service";
import { AuthModule } from "../auth/auth.module";
import { PetsModule } from "../pets/pets.module";
import { HealthPetRecordsController } from "./health-pet-records.controller";
import { HealthPetRecordsRepository } from "./health-pet-records.repository";
import { HealthPetRecordsService } from "./health-pet-records.service";

const blockchainServer = configService.getBlockchainServer();

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([HealthPetRecordsRepository]),
    HttpModule.register({
      baseURL: blockchainServer,
      headers: {
        "Content-Type": "application/json",
      },
    }),
    PetsModule,
  ],
  controllers: [HealthPetRecordsController],
  providers: [HealthPetRecordsService],
  exports: [HealthPetRecordsService],
})
export class HealthPetRecordsModule {}
