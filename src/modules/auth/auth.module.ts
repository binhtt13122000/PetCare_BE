import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Account } from "src/entities/authenticate_service/account.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "../users/user.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { MulterModule } from "@nestjs/platform-express";
import { SharedModule } from "src/shared/shared.module";
import { BranchesModule } from "../branches/branches.module";
import { CustomerModule } from "../customer/customer.module";
import { JwtStrategy } from "./guards/jwt.strategy";
import { RolesGuard } from "./guards/roles.guard";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    PassportModule,
    MulterModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get("JWT_SECRET_KEY"),
        signOptions: { expiresIn: "60h" },
      }),
      inject: [ConfigService],
    }),
    UserModule,
    ConfigModule,
    SharedModule,
    BranchesModule,
    CustomerModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RolesGuard, JwtAuthGuard],
  exports: [AuthService],
})
export class AuthModule {}
