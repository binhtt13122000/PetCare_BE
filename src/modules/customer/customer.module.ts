import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SharedModule } from "src/shared/shared.module";
import { AuthModule } from "../auth/auth.module";
import { UserModule } from "../users/user.module";
import { CustomerController } from "./customer.controller";
import { CustomerRepository } from "./customer.repository";
import { CustomerService } from "./customer.service";

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([CustomerRepository]),
    UserModule,
    SharedModule,
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}
