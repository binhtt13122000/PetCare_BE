import { forwardRef, Module } from "@nestjs/common";
import { TicketsService } from "./tickets.service";
import { TicketsController } from "./tickets.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TicketsRepository } from "./tickets.repository";
import { UserModule } from "../users/user.module";
import { CustomerModule } from "../customer/customer.module";
import { SharedModule } from "src/shared/shared.module";
import { BranchesModule } from "../branches/branches.module";
import { AuthModule } from "../auth/auth.module";
import { PetsModule } from "../pets/pets.module";

@Module({
  imports: [
    forwardRef(() => BranchesModule),
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([TicketsRepository]),
    UserModule,
    CustomerModule,
    SharedModule,
    PetsModule,
  ],
  providers: [TicketsService],
  controllers: [TicketsController],
  exports: [TicketsService],
})
export class TicketsModule {}
