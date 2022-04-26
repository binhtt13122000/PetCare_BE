import { Module } from "@nestjs/common";
import { MediasService } from "./medias.service";
import { MediasController } from "./medias.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MediasRepository } from "./medias.repository";
import { SharedModule } from "src/shared/shared.module";

@Module({
  imports: [TypeOrmModule.forFeature([MediasRepository]), SharedModule],
  providers: [MediasService],
  controllers: [MediasController],
  exports: [MediasService],
})
export class MediasModule {}
