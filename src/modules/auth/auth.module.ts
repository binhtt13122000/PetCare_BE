import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Account } from "src/entities/account.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "../users/user.module";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    // PassportModule,
    // JwtModule.register({
    //   secret: "PET-STORE-JWT-JWT_SECRET_KEY",
    //   signOptions: { expiresIn: "3600s" },
    // }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get("JWT_SECRET_KEY"),
        signOptions: { expiresIn: "3600s" },
      }),
      inject: [ConfigService],
    }),
    UserModule,
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
