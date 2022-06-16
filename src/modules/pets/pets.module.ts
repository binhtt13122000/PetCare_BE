import { Module } from "@nestjs/common";
import { PetsService } from "./pets.service";
import { PetsController } from "./pets.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PetsRepository } from "./pets.repository";
import { SharedModule } from "src/shared/shared.module";
import { HttpModule } from "@nestjs/axios";
import { configService } from "src/config/config.service";

const blockchainServer = configService.getBlockchainServer();
@Module({
  imports: [
    TypeOrmModule.forFeature([PetsRepository]),
    SharedModule,
    HttpModule.register({
      baseURL: blockchainServer,
    }),
  ],
  controllers: [PetsController],
  providers: [PetsService],
  exports: [PetsService],
})
export class PetsModule {}
