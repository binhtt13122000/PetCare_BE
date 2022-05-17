import { Module } from "@nestjs/common";
import { MessagesModule } from "../messages/messages.module";
import { RoomsModule } from "../rooms/rooms.module";
import { ChatGateway } from "./chat.gateway";

@Module({
  imports: [RoomsModule, MessagesModule],
  providers: [ChatGateway],
  exports: [ChatGateway],
})
export class ChatModule {}
