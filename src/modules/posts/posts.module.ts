import { forwardRef, Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostsRepository } from "./posts.repository";
import { PetsModule } from "../pets/pets.module";
import { SharedModule } from "src/shared/shared.module";
import { MediasModule } from "../medias/medias.module";
import { UserModule } from "../users/user.module";
import { BranchesModule } from "../branches/branches.module";

@Module({
  imports: [
    forwardRef(() => BranchesModule),
    TypeOrmModule.forFeature([PostsRepository]),
    PetsModule,
    SharedModule,
    MediasModule,
    UserModule,
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
