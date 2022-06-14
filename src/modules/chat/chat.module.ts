import { Module } from "@nestjs/common";
import { SharedModule } from "src/shared/shared.module";
import { CustomerModule } from "../customer/customer.module";
import { MessagesModule } from "../messages/messages.module";
import { PostsModule } from "../posts/posts.module";
import { RoomsModule } from "../rooms/rooms.module";
import { UserModule } from "../users/user.module";
import { ChatGateway } from "./chat.gateway";

@Module({
  imports: [
    RoomsModule,
    MessagesModule,
    UserModule,
    SharedModule,
    CustomerModule,
    PostsModule,
  ],
  providers: [ChatGateway],
  exports: [ChatGateway],
})
export class ChatModule {}
