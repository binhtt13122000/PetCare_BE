import { Module } from "@nestjs/common";
import { APP_FILTER, APP_INTERCEPTOR, RouterModule } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import * as ormconfig from "./ormconfig";
import { HttpExceptionFilter } from "./filters/http-exception.filter";
import { ResponseDataInterceptor } from "./interceptors/response-data.interceptor";
import { AuthModule } from "./modules/auth/auth.module";
import { AuthController } from "./modules/auth/auth.controller";
import { AuthService } from "./modules/auth/auth.service";
import { UserModule } from "./modules/users/user.module";
import { UserService } from "./modules/users/user.service";

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    RouterModule.register([{ path: "auth", module: AuthModule }]),
    AuthModule,
    UserModule,
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
