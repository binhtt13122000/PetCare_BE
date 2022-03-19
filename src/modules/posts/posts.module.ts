import { Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostsRepository } from "./posts.repository";
import { PetsModule } from "../pets/pets.module";

@Module({
  imports: [TypeOrmModule.forFeature([PostsRepository]), PetsModule],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
