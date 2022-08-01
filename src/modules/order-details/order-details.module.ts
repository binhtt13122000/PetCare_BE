import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { OrdersModule } from "../orders/orders.module";
import { OrderDetailsController } from "./order-details.controller";
import { OrderDetailRepostiory } from "./order-details.repository";
import { OrderDetailsService } from "./order-details.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderDetailRepostiory]),
    forwardRef(() => OrdersModule),
    forwardRef(() => AuthModule),
  ],
  controllers: [OrderDetailsController],
  providers: [OrderDetailsService],
  exports: [OrderDetailsService],
})
export class OrderDetailsModule {}
