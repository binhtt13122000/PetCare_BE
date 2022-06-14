import { Module } from "@nestjs/common";
import { TicketsService } from "./tickets.service";
import { TicketsController } from "./tickets.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TicketsRepository } from "./tickets.repository";
import { UserModule } from "../users/user.module";
import { CustomerModule } from "../customer/customer.module";
import { SharedModule } from "src/shared/shared.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketsRepository]),
    UserModule,
    CustomerModule,
    SharedModule,
  ],
  providers: [TicketsService],
  controllers: [TicketsController],
  exports: [TicketsService],
})
export class TicketsModule {}
