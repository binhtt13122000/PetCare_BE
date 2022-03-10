import { Module } from "@nestjs/common";
import { PapersService } from "./papers.service";
import { PapersController } from "./papers.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PapersRepository } from "./papers.repository";
import { SharedModule } from "src/shared/shared.module";

@Module({
  imports: [TypeOrmModule.forFeature([PapersRepository]), SharedModule],
  controllers: [PapersController],
  providers: [PapersService],
  exports: [PapersService],
})
export class PapersModule {}
