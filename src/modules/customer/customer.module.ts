import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../users/user.module";
import { CustomerController } from "./customer.controller";
import { CustomerRepository } from "./customer.repository";
import { CustomerService } from "./customer.service";

@Module({
  imports: [TypeOrmModule.forFeature([CustomerRepository]), UserModule],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}
