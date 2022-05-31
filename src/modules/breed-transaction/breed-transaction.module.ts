import { Module } from "@nestjs/common";
import { BreedTransactionService } from "./breed-transaction.service";
import { BreedTransactionController } from "./breed-transaction.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BreedTransactionRepository } from "./breed-transaction.repository";

@Module({
  imports: [TypeOrmModule.forFeature([BreedTransactionRepository])],
  providers: [BreedTransactionService],
  controllers: [BreedTransactionController],
  exports: [BreedTransactionService],
})
export class BreedTransactionModule {}
