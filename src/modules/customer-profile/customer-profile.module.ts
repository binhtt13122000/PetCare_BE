import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomerProfileController } from "./customer-profile.controller";
import { CustomerProfileRepository } from "./customer-profile.repository";
import { CustomerProfileService } from "./customer-profile.service";

@Module({
  imports: [TypeOrmModule.forFeature([CustomerProfileRepository])],
  controllers: [CustomerProfileController],
  providers: [CustomerProfileService],
  exports: [CustomerProfileService],
})
export class CustomerProfileModule {}
