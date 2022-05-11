import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServiceFeesController } from "./service-fees.controller";
import { ServiceFeesRepository } from "./service-fees.repository";
import { ServiceFeesService } from "./service-fees.service";

@Module({
  imports: [TypeOrmModule.forFeature([ServiceFeesRepository])],
  controllers: [ServiceFeesController],
  providers: [ServiceFeesService],
  exports: [ServiceFeesService],
})
export class ServiceFeesModule {}
