import { Module } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RolesRepository } from "./roles.repository";

@Module({
  imports: [TypeOrmModule.forFeature([RolesRepository])],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
