import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import mongoose from "mongoose";
import { IdParams } from "src/common";
import { NotificationEnum, RoomStatusEnum } from "src/enum";
import { Room } from "src/schemas/room.schemas";
import { NotificationProducerService } from "src/shared/notification/notification.producer.service";
import { CustomerService } from "../customer/customer.service";
import { UserService } from "../users/user.service";
import { RoomsService } from "./rooms.service";

@Controller("rooms")
@ApiTags("rooms")
export class RoomsController {
  constructor(
    private readonly roomsService: RoomsService,
    private readonly userService: UserService,
    private readonly customerService: CustomerService,
    private notificationProducerService: NotificationProducerService,
  ) {}

  @Post()
  async create(@Body() body: Room): Promise<Room> {
    if (body._id) {
      let bodyNotification = "",
        titleNotification = "",
        typeNotification = "";
      const customerInstance = await this.customerService.findById(
        body.isSellerMessage ? body.buyerId : body.sellerId,
      );
      const userInstance = await this.userService.findByPhoneNumber(
        customerInstance.phoneNumber || "",
      );
      const instance = await this.roomsService.findById(body._id);
      if (instance && userInstance) {
        if (
          instance.status === RoomStatusEnum.CREATED &&
          body.status === RoomStatusEnum.REQUESTED
        ) {
          bodyNotification =
            "You have a new request. See information details now.>>>>";
          titleNotification = "New Request";
          typeNotification = NotificationEnum.NEW_REQUEST;
        } else if (instance.status === RoomStatusEnum.REQUESTED) {
          if (body.status === RoomStatusEnum.REQUESTED) {
            bodyNotification =
              "You have an updated request. See information details now.>>>>";
            titleNotification = "Update Request";
            typeNotification = NotificationEnum.NEW_REQUEST;
          } else if (body.status === RoomStatusEnum.CREATED) {
            if (body.transactionId) {
              bodyNotification =
                "Seller have been approved your request. See information details now.>>>>>";
              titleNotification = "Approved Your Request";
              typeNotification = NotificationEnum.APPROVE_REQUEST;
            } else {
              bodyNotification = body.isSellerMessage
                ? "Buyer have been canceled. See information details now.>>>>"
                : "Seller have been rejected. See information details now.>>>>";
              titleNotification = body.isSellerMessage
                ? "Canceled Request"
                : "Rejected Request";
              typeNotification = body.isSellerMessage
                ? NotificationEnum.CANCELED_REQUEST
                : NotificationEnum.REJECT_REQUEST;
            }
          }
          if (titleNotification && bodyNotification && typeNotification) {
            await this.notificationProducerService.sendMessage(
              {
                body: bodyNotification,
                title: titleNotification,
                type: typeNotification,
                metadata: String(instance._id),
              },
              userInstance.id,
            );
          }
        }
      }
    }
    return this.roomsService.create(body);
  }

  @Get("user/:id")
  async findByUserId(
    @Param() params: IdParams,
    @Query("type") type?: "open" | "close",
  ): Promise<Room[]> {
    return this.roomsService.getUserRooms(params.id, type);
  }

  @Get(":id")
  async findByRoomId(@Param("id") id: string): Promise<Room> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException("id is not valid");
    }
    return this.roomsService.findById(id);
  }

  @Get("buyer/:buyerId/post/:postId")
  async findBySellerAndPost(
    @Param("buyerId") buyerId: string,
    @Param("postId") postId: string,
  ): Promise<Room> {
    return this.roomsService.findByBuyerAndPost(
      Number(buyerId),
      Number(postId),
    );
  }

  @Put()
  async update(@Body() body: Room): Promise<Room> {
    return this.roomsService.updateRoom(body);
  }
}
