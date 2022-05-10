import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransactionFeesController } from "./transaction-fees.controller";
import { TransactionFeesRepository } from "./transaction-fees.repository";
import { TransactionFeesService } from "./transaction-fees.service";

@Module({
  imports: [TypeOrmModule.forFeature([TransactionFeesRepository])],
  controllers: [TransactionFeesController],
  providers: [TransactionFeesService],
})
export class TransactionFeesModule {}
