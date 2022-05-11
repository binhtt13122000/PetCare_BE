import { Module } from "@nestjs/common";
import { ServiceFeesController } from "./service-fees.controller";
import { ServiceFeesService } from "./service-fees.service";

@Module({
  controllers: [ServiceFeesController],
  providers: [ServiceFeesService],
})
export class ServiceFeesModule {}
