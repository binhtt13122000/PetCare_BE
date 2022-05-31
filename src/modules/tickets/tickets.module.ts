import { Module } from "@nestjs/common";
import { TicketsService } from "./tickets.service";
import { TicketsController } from "./tickets.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TicketsRepository } from "./tickets.repository";

@Module({
  imports: [TypeOrmModule.forFeature([TicketsRepository])],
  providers: [TicketsService],
  controllers: [TicketsController],
  exports: [TicketsService],
})
export class TicketsModule {}