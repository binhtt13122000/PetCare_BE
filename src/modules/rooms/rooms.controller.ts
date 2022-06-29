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
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import mongoose from "mongoose";
import { IdParams } from "src/common";
import { Customer } from "src/entities/user_management_service/customer.entity";
import { Room } from "src/schemas/room.schemas";
import { CustomerService } from "../customer/customer.service";
import { ResponseRoom } from "./dtos/response-room.dto";
import { RoomsService } from "./rooms.service";

@Controller("rooms")
@ApiTags("rooms")
export class RoomsController {
  constructor(
    private readonly roomsService: RoomsService,
    private readonly customerService: CustomerService,
  ) {}

  @Post()
  async create(@Body() body: Room): Promise<Room> {
    return this.roomsService.create(body);
  }

  @Get("user/:id")
  @ApiQuery({
    name: "type",
    required: false,
  })
  async findByUserId(
    @Param() params: IdParams,
    @Query("type") type?: "open" | "close",
  ): Promise<ResponseRoom[]> {
    const roomList = await this.roomsService.getUserRooms(params.id, type);
    let responseRooms: ResponseRoom[] = [];
    if (roomList && roomList.length > 0) {
      responseRooms = await Promise.all(
        roomList.map(async (item) => {
          let customer: Customer;
          if (item.buyerId == params.id) {
            customer = await this.customerService.findById(item.sellerId);
          } else {
            customer = await this.customerService.findById(item.buyerId);
          }
          let responseRoom = new ResponseRoom();
          responseRoom = {
            _id: item._id,
            sellerId: item.sellerId,
            buyerId: item.buyerId,
            postId: item.postId,
            newestMessage: item.newestMessage,
            newestMessageTime: item.newestMessageTime,
            isSellerMessage: item.isSellerMessage,
            sellerLastViewTime: item.sellerLastViewTime,
            buyerLastViewTime: item.buyerLastViewTime,
            transactionTime: item.transactionTime,
            transactionId: item.transactionId,
            transactionPlace: item.transactionPlace,
            description: item.description,
            createdTime: item.createdTime,
            type: item.type,
            petId: item.petId,
            status: item.status,
            customer,
          };
          return responseRoom;
        }),
      );
    }
    return responseRooms;
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
