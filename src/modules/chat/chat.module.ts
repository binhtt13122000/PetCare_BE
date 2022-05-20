import { Module } from "@nestjs/common";
import { MessagesModule } from "../messages/messages.module";
import { RoomsModule } from "../rooms/rooms.module";
import { ChatGateway } from "./chat.gateway";
import { CustomerModule } from "../customer/customer.module";

@Module({
  imports: [RoomsModule, MessagesModule, CustomerModule],
  providers: [ChatGateway],
  exports: [ChatGateway],
})
export class ChatModule {}
