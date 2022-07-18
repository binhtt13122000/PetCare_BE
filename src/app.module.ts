import { CacheModule, Module } from "@nestjs/common";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import * as ormconfig from "./ormconfig";
import { HttpExceptionFilter } from "./filters/http-exception.filter";
import { ResponseDataInterceptor } from "./interceptors/response-data.interceptor";
import { AuthModule } from "./modules/auth/auth.module";
import { UserModule } from "./modules/users/user.module";
import { VaccineModule } from "./modules/vaccine/vaccine.module";
import { PetsModule } from "./modules/pets/pets.module";
import { SharedModule } from "./shared/shared.module";
import { PostsModule } from "./modules/posts/posts.module";
import { RolesModule } from "./modules/roles/roles.module";
import { ServicesModule } from "./modules/services/services.module";
import { OrdersModule } from "./modules/orders/orders.module";
import { MediasModule } from "./modules/medias/medias.module";
import { SaleTransactionsModule } from "./modules/sale-transactions/sale-transactions.module";
import { MongooseModule } from "@nestjs/mongoose";
import { RoomsModule } from "./modules/rooms/rooms.module";
import { configService } from "src/config/config.service";
import { BranchesModule } from "./modules/branches/branches.module";
import { BreedsModule } from "./modules/breeds/breeds.module";
import { SpeciesModule } from "./modules/species/species.module";
import { TransactionFeesModule } from "./modules/transaction-fees/transaction-fees.module";
import { HealthPetRecordsModule } from "./modules/health-pet-records/health-pet-records.module";
import { PromotionsModule } from "./modules/promotions/promotions.module";
import { ServiceFeesModule } from "./modules/service-fees/service-fees.module";
import { MessagesModule } from "./modules/messages/messages.module";
import { ChatModule } from "./modules/chat/chat.module";
import { OrderDetailsModule } from "./modules/order-details/order-details.module";
import { TicketsModule } from "./modules/tickets/tickets.module";
import { BreedTransactionModule } from "./modules/breed-transaction/breed-transaction.module";
import { PetOwnerModule } from "./modules/pet-owner/pet-owner.module";
import { CombosModule } from "./modules/combos/combos.module";
import { ScheduleModule } from "@nestjs/schedule";
import { PetComboModule } from "./modules/pet-combo/pet-combo.module";
import { ComboServiceController } from "./modules/combo-services/combo-services.controller";
import { ComboServiceModule } from "./modules/combo-services/combo-services.module";
import { PetComboServicesModule } from "./modules/pet-combo-services/pet-combo-services.module";
import { HttpModule } from "@nestjs/axios";

const mongoConnectionString = configService.getMongoConnectionString();
@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    MongooseModule.forRoot(mongoConnectionString),
    ScheduleModule.forRoot(),
    AuthModule,
    UserModule,
    VaccineModule,
    HealthPetRecordsModule,
    PetsModule,
    SharedModule,
    PostsModule,
    RolesModule,
    ServicesModule,
    OrdersModule,
    OrderDetailsModule,
    MediasModule,
    SaleTransactionsModule,
    RoomsModule,
    BranchesModule,
    TransactionFeesModule,
    SpeciesModule,
    BreedsModule,
    PromotionsModule,
    ServiceFeesModule,
    MessagesModule,
    ChatModule,
    TicketsModule,
    BreedTransactionModule,
    PetOwnerModule,
    CombosModule,
    PetComboModule,
    CacheModule.register({
      isGlobal: true,
      ttl: 600,
    }),
    ComboServiceModule,
    PetComboServicesModule,
    HttpModule,
  ],
  controllers: [AppController, ComboServiceController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseDataInterceptor,
    },
    AppService,
  ],
})
export class AppModule {}
