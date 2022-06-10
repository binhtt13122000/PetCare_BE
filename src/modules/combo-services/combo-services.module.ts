import { Module } from "@nestjs/common";

import { ComboServiceController } from "./combo-services.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ComboServicesRepository } from "./combo-services.repository";
import { ComboServicesService } from "./combo-services.service";

@Module({
  imports: [TypeOrmModule.forFeature([ComboServicesRepository])],
  providers: [ComboServicesService],
  controllers: [ComboServiceController],
  exports: [ComboServicesService],
})
export class ComboServiceModule {}
