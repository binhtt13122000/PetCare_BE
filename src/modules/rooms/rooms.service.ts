import { Model } from "mongoose";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Room, RoomDocument } from "src/schemas/room.schemas";
import { RoomStatusEnum } from "src/enum";

@Injectable()
export class RoomsService {
  constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>) {}

  async create(createRoomDTO: Room): Promise<Room> {
    const createdRoom = new this.roomModel(createRoomDTO);
    return createdRoom.save();
  }

  async updateRoom(updateRoomDTO: Room): Promise<Room> {
    const room = await this.roomModel.findById(updateRoomDTO._id);
    if (!room) {
      throw new HttpException("not found", HttpStatus.NOT_FOUND);
    }
    const returnedRoom = { ...room.toObject, ...updateRoomDTO };
    return await this.roomModel
      .findByIdAndUpdate(updateRoomDTO._id, returnedRoom, { new: true })
      .exec();
  }

  async findAll(): Promise<Room[]> {
    return this.roomModel.find().exec();
  }

  async findById(id: string): Promise<Room> {
    return this.roomModel.findById(id).exec();
  }

  async findByBuyerAndPost(buyerId: number, postId: number): Promise<Room> {
    return this.roomModel
      .findOne({
        $and: [
          {
            buyerId: buyerId,
          },
          {
            postId: postId,
          },
        ],
      })
      .exec();
  }

  async findAllRoomAvailableByPost(postId: number): Promise<Room[]> {
    return this.roomModel
      .find({
        $and: [
          {
            postId: postId,
          },
        ],
      })
      .exec();
  }

  async getUserRooms(userId: number, type?: "open" | "close"): Promise<Room[]> {
    if (!type) {
      return this.roomModel
        .find({
          $or: [
            {
              buyerId: userId,
            },
            {
              sellerId: userId,
            },
          ],
        })
        .sort({
          newestMessageTime: "desc",
        })
        .exec();
    } else {
      if (type === "open") {
        return this.roomModel
          .find({
            $and: [
              {
                $or: [
                  {
                    buyerId: userId,
                  },
                  {
                    sellerId: userId,
                  },
                ],
              },
              {
                $or: [
                  {
                    status: RoomStatusEnum.CREATED,
                  },
                  {
                    status: RoomStatusEnum.REQUESTED,
                  },
                ],
              },
            ],
          })
          .sort({
            newestMessageTime: "desc",
          })
          .exec();
      } else if (type === "close") {
        return this.roomModel
          .find({
            $and: [
              {
                $or: [
                  {
                    buyerId: userId,
                  },
                  {
                    sellerId: userId,
                  },
                ],
              },
              {
                $or: [
                  {
                    status: RoomStatusEnum.BLOCKED,
                  },
                  {
                    status: RoomStatusEnum.CLOSED,
                  },
                  {
                    status: RoomStatusEnum.EXPIRED,
                  },
                ],
              },
            ],
          })
          .sort({
            newestMessageTime: "desc",
          })
          .exec();
      }
    }
  }
}
