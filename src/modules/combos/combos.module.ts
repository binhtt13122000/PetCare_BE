import { forwardRef, Module } from "@nestjs/common";
import { CombosService } from "./combos.service";
import { CombosController } from "./combos.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CombosRepository } from "./combos.repository";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([CombosRepository]),
  ],
  providers: [CombosService],
  controllers: [CombosController],
  exports: [CombosService],
})
export class CombosModule {}
