import { Module } from "@nestjs/common";
import { SaleTransactionsService } from "./sale-transactions.service";
import { SaleTransactionsController } from "./sale-transactions.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SaleTransactionsRepository } from "./sale-transaction.repository";
import { CustomerModule } from "../customer/customer.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([SaleTransactionsRepository]),
    CustomerModule,
  ],
  providers: [SaleTransactionsService],
  controllers: [SaleTransactionsController],
  exports: [SaleTransactionsService],
})
export class SaleTransactionsModule {}
