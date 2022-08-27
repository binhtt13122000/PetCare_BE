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
import { AuthModule } from "../auth/auth.module";
import { RoomsModule } from "../rooms/rooms.module";
import { MessagesModule } from "../messages/messages.module";
import { ChatModule } from "../chat/chat.module";
import { CustomerModule } from "../customer/customer.module";
import { TicketsModule } from "../tickets/tickets.module";

@Module({
  imports: [
    forwardRef(() => BranchesModule),
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([PostsRepository]),
    PetsModule,
    SharedModule,
    MediasModule,
    UserModule,
    RoomsModule,
    MessagesModule,
    ChatModule,
    CustomerModule,
    TicketsModule,
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
