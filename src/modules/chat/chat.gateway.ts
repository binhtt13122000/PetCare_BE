import { SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { Socket } from "socket.io";
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
  constructor(
    private readonly messageService: MessagesService,
    private readonly roomService: RoomsService,
  ) {}

  @SubscribeMessage("joinRoom")
  handleJoinRoom(client: Socket, roomId: string): void {
    client.join(roomId);
    client.emit("joinedRoom", roomId);
  }

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
        isSellerMessage: true,
        newestMessage: message.content,
        newestMessageTime: message.createdTime,
        ownerId: message.ownerId,
        postId: message.postId,
        sellerId: message.sellerId,
        status: RoomStatusEnum.CREATED,
      });
      const createdMessage = await this.messageService.create({
        ...message,
        room: createdRoom._id,
      });
      client.join(createdRoom._id);
      client.in(createdRoom._id).emit("chatToClient", createdMessage);
    } else {
      const createdMessage = await this.messageService.create({
        ...message,
      });
      client.in(message.room).emit("chatToClient", createdMessage);
    }
  }
}
