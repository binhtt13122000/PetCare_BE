import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { MessagesService } from "../messages/messages.service";
import { RoomsService } from "../rooms/rooms.service";
import { MessageDTO } from "./message.dto";
import { RoomStatusEnum } from "src/enum";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;
  constructor(
    private readonly messageService: MessagesService,
    private readonly roomService: RoomsService,
  ) {}

  @SubscribeMessage("leaveRoom")
  handleLeaveRoom(client: Socket, roomId: string): void {
    client.leave(roomId);
    client.emit("leftRoom", roomId);
  }

  @SubscribeMessage("chatToServer")
  async handleMessage(client: Socket, message: MessageDTO): Promise<void> {
    if (!message.room) {
      const createdRoom = await this.roomService.create({
        createdTime: message.createdTime,
        isSellerMessage: false,
        newestMessage: message.content,
        newestMessageTime: message.createdTime,
        buyerId: message.buyerId,
        postId: message.postId,
        sellerId: message.sellerId,
        status: RoomStatusEnum.CREATED,
      });
      const createdMessage = await this.messageService.create({
        ...message,
        room: createdRoom._id,
      });
      client.join(createdRoom._id);
      this.server.in(createdRoom._id).emit("chatToClient", createdMessage);
    } else {
      const createdMessage = await this.messageService.create({
        content: message.content,
        createdTime: message.createdTime,
        isSellerMessage: message.isSellerMessage,
        room: message.room || "",
        type: message.type,
      });
      this.server.in(message.room).emit("chatToClient", createdMessage);
    }
  }
}
