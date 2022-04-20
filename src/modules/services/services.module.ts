import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServicesController } from "./services.controller";
import { ServiceRepository } from "./services.repository";
import { ShopService } from "./services.service";

@Module({
  imports: [TypeOrmModule.forFeature([ServiceRepository])],
  controllers: [ServicesController],
  providers: [ShopService],
  exports: [ShopService],
})
export class ServicesModule {}
