import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { PromotionsController } from "./promotions.controller";
import { PromotionsRepository } from "./promotions.repository";
import { PromotionsService } from "./promotions.service";

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([PromotionsRepository])],
  controllers: [PromotionsController],
  providers: [PromotionsService],
  exports: [PromotionsService],
})
export class PromotionsModule {}
