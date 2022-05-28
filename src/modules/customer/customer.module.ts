import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SharedModule } from "src/shared/shared.module";
import { UserModule } from "../users/user.module";
import { CustomerController } from "./customer.controller";
import { CustomerRepository } from "./customer.repository";
import { CustomerService } from "./customer.service";
import { FollowsModule } from "../follows/follows.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerRepository]),
    UserModule,
    SharedModule,
    FollowsModule,
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}
