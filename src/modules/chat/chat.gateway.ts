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

  @SubscribeMessage("chatToServer")
  async handleMessage(client: Socket, message: MessageDTO): Promise<void> {
    // eslint-disable-next-line no-console
    if (message.room) {
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
      client.emit("chatToClient", createdMessage);
    } else {
      const createdMessage = await this.messageService.create({
        ...message,
      });
      client.join(message.room);
      client.emit("chatToClient", createdMessage);
    }
  }

  @SubscribeMessage("joinRoom")
  handleRoomJoin(client: Socket, room: string): void {
    client.join(room);
    client.emit("joinedRoom", room);
  }

  @SubscribeMessage("leaveRoom")
  handleRoomLeave(client: Socket, room: string): void {
    client.leave(room);
    client.emit("leftRoom", room);
  }
}
