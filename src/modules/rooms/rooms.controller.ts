import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import mongoose from "mongoose";
import { IdParams } from "src/common";
import { Room } from "src/schemas/room.schemas";
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
  async findByUserId(@Param() params: IdParams): Promise<Room[]> {
    return this.roomsService.getUserRooms(params.id);
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

  @Get(":roomId")
  async findRoomByRoomId(@Param("roomId") roomId: string): Promise<Room> {
    return this.roomsService.findRoomById(roomId);
  }
}
