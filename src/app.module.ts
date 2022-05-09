import { Module } from "@nestjs/common";
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
import { PapersModule } from "./modules/papers/papers.module";
import { PetsModule } from "./modules/pets/pets.module";
import { SharedModule } from "./shared/shared.module";
import { PostsModule } from "./modules/posts/posts.module";
import { RolesModule } from "./modules/roles/roles.module";
import { PaymentModule } from "./modules/payment/payment.module";
import { ServicesModule } from "./modules/services/services.module";
import { OrdersModule } from "./modules/orders/orders.module";
import { MediasModule } from "./modules/medias/medias.module";
import { SaleTransactionsModule } from "./modules/sale-transactions/sale-transactions.module";
import { MongooseModule } from "@nestjs/mongoose";
import { RoomsModule } from "./modules/rooms/rooms.module";
import { configService } from "src/config/config.service";
import { StaffModule } from "./modules/staff/staff.module";

const mongoConnectionString = configService.getMongoConnectionString();
@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    MongooseModule.forRoot(mongoConnectionString),
    AuthModule,
    UserModule,
    VaccineModule,
    PapersModule,
    PetsModule,
    SharedModule,
    PostsModule,
    RolesModule,
    PaymentModule,
    ServicesModule,
    OrdersModule,
    MediasModule,
    SaleTransactionsModule,
    RoomsModule,
    StaffModule,
  ],
  controllers: [AppController],
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
