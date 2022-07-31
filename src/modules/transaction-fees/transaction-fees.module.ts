import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { TransactionFeesController } from "./transaction-fees.controller";
import { TransactionFeesRepository } from "./transaction-fees.repository";
import { TransactionFeesService } from "./transaction-fees.service";

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([TransactionFeesRepository])],
  controllers: [TransactionFeesController],
  providers: [TransactionFeesService],
})
export class TransactionFeesModule {}
