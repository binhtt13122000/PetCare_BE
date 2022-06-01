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
import { MessageEnum } from "src/schemas/message.schema";

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
    client.join(roomId.valueOf());
  }

  @SubscribeMessage("leaveRoom")
  handleLeaveRoom(client: Socket, roomId: string): void {
    client.leave(roomId.valueOf());
  }

  @SubscribeMessage("updateRoom")
  async handleUpdateRoom(
    client: Socket,
    room: Room & { message: string },
  ): Promise<void> {
    const updatedRoom = await this.roomService.updateRoom(room);
    const createdMessage = await this.messageService.create({
      content: room.message,
      createdTime: room.newestMessageTime,
      isSellerMessage: room.isSellerMessage,
      room: room._id,
      type: MessageEnum.NORMAL,
    });
    client.join(room._id.valueOf());
    this.server.in(room._id.valueOf()).emit("updatedRoom", updatedRoom);
    this.server.in(room._id.valueOf()).emit("chatToClient", createdMessage);
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
      client.join(createdRoom._id.valueOf());
      this.server
        .in(createdRoom._id.valueOf())
        .emit("chatToClient", createdMessage);
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
      client.join(message.room.valueOf());
      this.server
        .in(message.room.valueOf())
        .emit("chatToClient", createdMessage);
    }
  }
}
