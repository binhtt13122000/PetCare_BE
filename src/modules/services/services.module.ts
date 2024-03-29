import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServicesController } from "./services.controller";
import { ServiceRepository } from "./services.repository";
import { ShopService } from "./services.service";
import { ServiceFeesModule } from "../service-fees/service-fees.module";
import { TicketsModule } from "../tickets/tickets.module";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([ServiceRepository]),
    ServiceFeesModule,
    TicketsModule,
  ],
  controllers: [ServicesController],
  providers: [ShopService],
  exports: [ShopService],
})
export class ServicesModule {}
