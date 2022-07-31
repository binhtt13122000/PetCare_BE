import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { BreedsController } from "./breeds.controller";
import { BreedsRepository } from "./breeds.repository";

import { BreedsService } from "./breeds.service";

@Module({
  imports: [TypeOrmModule.forFeature([BreedsRepository]), AuthModule],
  controllers: [BreedsController],
  providers: [BreedsService],
  exports: [BreedsService],
})
export class BreedsModule {}
