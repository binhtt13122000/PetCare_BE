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

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
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
