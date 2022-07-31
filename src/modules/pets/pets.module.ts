import { forwardRef, Module } from "@nestjs/common";
import { PetsService } from "./pets.service";
import { PetsController } from "./pets.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PetsRepository } from "./pets.repository";
import { SharedModule } from "src/shared/shared.module";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([PetsRepository]),
    SharedModule,
  ],
  controllers: [PetsController],
  providers: [PetsService],
  exports: [PetsService],
})
export class PetsModule {}
