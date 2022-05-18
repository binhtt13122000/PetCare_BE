import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrdersModule } from "../orders/orders.module";
import { OrderDetailsController } from "./order-details.controller";
import { OrderDetailRepostiory } from "./order-details.repository";
import { OrderDetailsService } from "./order-details.service";

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetailRepostiory]), OrdersModule],
  controllers: [OrderDetailsController],
  providers: [OrderDetailsService],
  exports: [OrderDetailsService],
})
export class OrderDetailsModule {}
