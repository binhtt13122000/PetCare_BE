import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomerRepository } from "./customer.repository";
import { CustomerService } from "./customer.service";

@Module({
  imports: [TypeOrmModule.forFeature([CustomerRepository])],
  controllers: [],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}
