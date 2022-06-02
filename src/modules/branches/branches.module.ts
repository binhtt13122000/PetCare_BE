import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../users/user.module";
import { SharedModule } from "src/shared/shared.module";
import { BranchesRepository } from "./branches.repository";
import { BranchesController } from "./branches.controller";
import { BranchesService } from "./branches.service";
import { OrdersModule } from "../orders/orders.module";
import { SaleTransactionsModule } from "../sale-transactions/sale-transactions.module";
import { BreedTransactionModule } from "../breed-transaction/breed-transaction.module";
import { ServicesModule } from "../services/services.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([BranchesRepository]),
    UserModule,
    SharedModule,
    OrdersModule,
    SaleTransactionsModule,
    BreedTransactionModule,
    ServicesModule,
  ],
  controllers: [BranchesController],
  providers: [BranchesService],
  exports: [BranchesService],
})
export class BranchesModule {}
