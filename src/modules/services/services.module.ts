import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServicesController } from "./services.controller";
import { ServiceRepository } from "./services.repository";
import { ShopService } from "./services.service";
import { ServiceFeesModule } from "../service-fees/service-fees.module";

@Module({
  imports: [TypeOrmModule.forFeature([ServiceRepository]), ServiceFeesModule],
  controllers: [ServicesController],
  providers: [ShopService],
  exports: [ShopService],
})
export class ServicesModule {}
