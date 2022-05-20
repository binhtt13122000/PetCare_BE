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
import { Room } from "src/schemas/room.schemas";
import { CustomerService } from "../customer/customer.service";

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
    private readonly customerService: CustomerService,
  ) {}

  @SubscribeMessage("joinRoom")
  handleJoinRoom(client: Socket, roomId: string): void {
    client.join(roomId);
  }

  @SubscribeMessage("leaveRoom")
  handleLeaveRoom(client: Socket, roomId: string): void {
    client.leave(roomId);
  }

  @SubscribeMessage("updateRoom")
  async handleUpdateRoom(client: Socket, room: Room): Promise<void> {
    const updatedRoom = await this.roomService.updateRoom(room);
    client.join(room._id);
    this.server.in(room._id).emit("updatedRoom", updatedRoom);
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
        sellerJson: JSON.stringify(
          await this.customerService.findById(message.sellerId),
        ),
        buyerJson: JSON.stringify(
          await this.customerService.findById(message.buyerId),
        ),
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
