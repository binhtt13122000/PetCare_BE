import { Module } from "@nestjs/common";
import { PapersService } from "./papers.service";
import { PapersController } from "./papers.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PapersRepository } from "./papers.repository";

@Module({
  imports: [TypeOrmModule.forFeature([PapersRepository])],
  controllers: [PapersController],
  providers: [PapersService],
})
export class PapersModule {}
