import { Module } from "@nestjs/common";
import {
  APP_FILTER,
  APP_INTERCEPTOR,
  RouterModule,
  Routes,
} from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import * as ormconfig from "./ormconfig";
import { HttpExceptionFilter } from "./filters/http-exception.filter";
import { ResponseDataInterceptor } from "./interceptors/response-data.interceptor";
import { AuthModule } from "./modules/auth/auth.module";
import { AuthController } from "./modules/auth/auth.controller";
import { AuthService } from "./modules/auth/auth.service";
import { Account } from "./entities/account.entity";
import { ConfigModule, ConfigService } from "@nestjs/config";
import Joi = require("joi");
import { UserModule } from "./modules/users/user.module";
import { UserService } from "./modules/users/user.service";
import { UserRepository } from "./modules/users/user.repository";
import appConfig from "./config/app.config";
import authConfig from "./config/auth.config";
import { JwtModule } from "@nestjs/jwt";
// const routes: Routes = [
//   {
//     path: "auth",
//     module: AuthModule,
//   },
// ];
@Module({
  imports: [
    // ConfigModule.forRoot({
    //   validationSchema: Joi.object({
    //     ACCESS_TOKEN_SECRET: Joi.string().required(),
    //     ACCESS_TOKEN_EXPIRATION: Joi.string().required(),
    //     // REFRESH_TOKEN_SECRET: Joi.string().required(),
    //     // REFRESH_TOKEN_EXPIRATION: Joi.string().required(),
    //   }),
    // }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get("JWT_SECRET_KEY"),
        signOptions: { expiresIn: "3600s" },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, authConfig],
    }),
    TypeOrmModule.forRoot(ormconfig),
    TypeOrmModule.forFeature([Account]),
    RouterModule.register([{ path: "auth", module: AuthModule }]),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController, AuthController],
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
    AuthService,
    UserService,
  ],
})
export class AppModule {}
