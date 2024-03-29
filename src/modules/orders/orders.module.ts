import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SharedModule } from "src/shared/shared.module";
import { AuthModule } from "../auth/auth.module";
import { BreedTransactionModule } from "../breed-transaction/breed-transaction.module";
import { ComboServiceModule } from "../combo-services/combo-services.module";
import { CombosModule } from "../combos/combos.module";
import { CustomerModule } from "../customer/customer.module";
import { HealthPetRecordsModule } from "../health-pet-records/health-pet-records.module";
import { OrderDetailsModule } from "../order-details/order-details.module";
import { PetComboServicesModule } from "../pet-combo-services/pet-combo-services.module";
import { PetComboModule } from "../pet-combo/pet-combo.module";
import { PetsModule } from "../pets/pets.module";
import { ServicesModule } from "../services/services.module";
import { TicketsModule } from "../tickets/tickets.module";
import { UserModule } from "../users/user.module";
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
    SharedModule,
    UserModule,
    ServicesModule,
    PetsModule,
    HealthPetRecordsModule,
    forwardRef(() => PetComboServicesModule),
    forwardRef(() => AuthModule),
    forwardRef(() => TicketsModule),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
