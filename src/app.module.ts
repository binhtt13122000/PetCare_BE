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

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    AuthModule,
    UserModule,
    VaccineModule,
    PapersModule,
    PetsModule,
    SharedModule,
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
