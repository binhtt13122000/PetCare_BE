import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BreedTransactionModule } from "../breed-transaction/breed-transaction.module";
import { ComboServiceModule } from "../combo-services/combo-services.module";
import { CombosModule } from "../combos/combos.module";
import { CustomerModule } from "../customer/customer.module";
import { OrderDetailsModule } from "../order-details/order-details.module";
import { PetComboServicesModule } from "../pet-combo-services/pet-combo-services.module";
import { PetComboModule } from "../pet-combo/pet-combo.module";
import { OrdersController } from "./orders.controller";
import { OrdersRepository } from "./orders.repository";
import { OrdersService } from "./orders.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([OrdersRepository]),
    CustomerModule,
    CombosModule,
    ComboServiceModule,
    BreedTransactionModule,
    PetComboModule,
    OrderDetailsModule,
    forwardRef(() => PetComboServicesModule),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
