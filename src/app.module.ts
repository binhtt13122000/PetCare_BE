import { Module } from "@nestjs/common";
import {
  APP_FILTER,
  APP_INTERCEPTOR,
  RouterModule,
  Routes,
} from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { configService } from "./config/dbConfig.service";
import { HttpExceptionFilter } from "./filters/http-exception.filter";
import { ResponseDataInterceptor } from "./interceptors/response-data.interceptor";
import { AuthModule } from "./modules/auth/auth.module";
const routes: Routes = [
  {
    path: "auth",
    module: AuthModule,
  },
];
@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    RouterModule.register(routes),
    AuthModule,
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
  ],
})
export class AppModule {}
