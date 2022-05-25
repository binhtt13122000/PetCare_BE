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
import { NotFoundException } from "@nestjs/common";

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
        status: RoomStatusEnum.CREATED,
        type: message.roomType,
      });
      const createdMessage = await this.messageService.create({
        ...message,
        room: createdRoom._id,
      });
      client.join(createdRoom._id);
      this.server.in(createdRoom._id).emit("chatToClient", createdMessage);
    } else {
      const room = await this.roomService.findById(message.room);
      if (!room) {
        throw new NotFoundException("not found");
      }
      const createdMessage = await this.messageService.create({
        content: message.content,
        createdTime: message.createdTime,
        isSellerMessage: message.isSellerMessage,
        room: message.room || "",
        type: message.type,
      });
      room.newestMessage = message.content;
      room.newestMessageTime = message.createdTime;
      room.isSellerMessage = message.isSellerMessage;
      await this.roomService.updateRoom(room);
      this.server.in(message.room).emit("chatToClient", createdMessage);
    }
  }
}
