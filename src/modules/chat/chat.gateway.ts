import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { MessagesService } from "../messages/messages.service";
import { RoomsService } from "../rooms/rooms.service";
import { MessageDTO } from "./message.dto";
import { NotificationEnum, RoomStatusEnum } from "src/enum";
import { Room } from "src/schemas/room.schemas";
import { NotFoundException } from "@nestjs/common";
import { MessageEnum } from "src/schemas/message.schema";
import { UserService } from "../users/user.service";
import { NotificationProducerService } from "src/shared/notification/notification.producer.service";
import { CustomerService } from "../customer/customer.service";
import { PostsService } from "../posts/posts.service";

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
    private readonly postService: PostsService,
    private readonly userService: UserService,
    private readonly customerService: CustomerService,
    private readonly notificationProducerService: NotificationProducerService,
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
    const existedRoomInstance = await this.roomService.findById(room._id);
    const updatedRoom = await this.roomService.updateRoom(room);
    const customerInstance = await this.customerService.findById(
      room.isSellerMessage ? room.buyerId : room.sellerId,
    );
    const userInstance = await this.userService.findByPhoneNumber(
      customerInstance.phoneNumber || "",
    );
    let bodyNotification = "",
      titleNotification = "",
      typeNotification = "";
    if (existedRoomInstance && userInstance) {
      if (
        existedRoomInstance.status === RoomStatusEnum.CREATED &&
        room.status === RoomStatusEnum.REQUESTED
      ) {
        bodyNotification =
          "You have a new request. See information details now.>>>>";
        titleNotification = "New Request";
        typeNotification = NotificationEnum.NEW_REQUEST;
      } else if (existedRoomInstance.status === RoomStatusEnum.REQUESTED) {
        if (room.status === RoomStatusEnum.REQUESTED) {
          bodyNotification =
            "You have an updated request. See information details now.>>>>";
          titleNotification = "Update Request";
          typeNotification = NotificationEnum.UPDATE_REQUEST;
        } else if (room.status === RoomStatusEnum.CREATED) {
          if (room.transactionId) {
            bodyNotification =
              "Seller have been approved your request. See information details now.>>>>>";
            titleNotification = "Approved Your Request";
            typeNotification = NotificationEnum.APPROVE_REQUEST;
          } else {
            bodyNotification = room.isSellerMessage
              ? "Seller have been rejected. See information details now.>>>>"
              : "Buyer have been canceled. See information details now.>>>>";
            titleNotification = room.isSellerMessage
              ? "Rejected Request"
              : "Canceled Request";
            typeNotification = room.isSellerMessage
              ? NotificationEnum.REJECT_REQUEST
              : NotificationEnum.CANCELED_REQUEST;
          }
        }
      }
      if (titleNotification && bodyNotification && typeNotification) {
        await this.notificationProducerService.sendMessage(
          {
            body: bodyNotification,
            title: titleNotification,
            type: typeNotification,
            metadata: String(existedRoomInstance._id),
          },
          userInstance.id,
        );
      }
    }
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
      const room = await this.roomService.findByBuyerAndPost(
        message.buyerId,
        message.postId,
      );
      if (room) {
        client.join(room._id.valueOf());
        this.server.in(room._id.valueOf()).emit("chatToClient", {
          error: "Room is existed!",
        });
      } else {
        const postInstance = await this.postService.findById(
          message.postId || "",
        );
        const sellerInstance = await this.customerService.findById(
          message.sellerId,
        );
        const accountSellerInstance = await this.userService.findByPhoneNumber(
          sellerInstance.phoneNumber,
        );
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

        await this.notificationProducerService.sendMessage(
          {
            body: `${postInstance.title} - ${postInstance.transactionTotal}`,
            title: "A New Message",
            type: NotificationEnum.NEW_ROOM_CREATED,
            metadata: String(createdRoom._id),
          },
          accountSellerInstance.id,
        );
      }
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
