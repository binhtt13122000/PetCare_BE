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
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  async create(@Body() body: Room): Promise<Room> {
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
