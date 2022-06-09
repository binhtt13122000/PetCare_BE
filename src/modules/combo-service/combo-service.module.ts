import { Module } from "@nestjs/common";
import { ComboServiceService } from "./combo-service.service";
import { ComboServiceController } from "./combo-service.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ComboServiceRepository } from "./combo-service.repository";

@Module({
  imports: [TypeOrmModule.forFeature([ComboServiceRepository])],
  providers: [ComboServiceService],
  controllers: [ComboServiceController],
  exports: [ComboServiceService],
})
export class ComboServiceModule {}
