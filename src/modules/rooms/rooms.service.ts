import { Model } from "mongoose";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Room, RoomDocument } from "src/schemas/room.schemas";

@Injectable()
export class RoomsService {
  constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>) {}

  async create(createRoomDTO: Room): Promise<Room> {
    const createdRoom = new this.roomModel(createRoomDTO);
    return createdRoom.save();
  }

  async updateRoom(updateRoomDTO: Room): Promise<Room> {
    const room = await this.roomModel.findById(updateRoomDTO._id);
    if (room) {
      throw new HttpException("not found", HttpStatus.NOT_FOUND);
    }
    return await this.roomModel
      .findByIdAndUpdate(updateRoomDTO._id, { ...room, ...updateRoomDTO })
      .exec();
  }

  async findAll(): Promise<Room[]> {
    return this.roomModel.find().exec();
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

  async getUserRooms(userId: number): Promise<Room[]> {
    return (
      this.roomModel
        .find({
          $or: [
            {
              ownerId: userId,
            },
            {
              sellerId: userId,
            },
          ],
        })
        // .select(["-messages"])
        .exec()
    );
  }

  async findRoomById(id: string): Promise<Room> {
    const room = await this.roomModel.findById(id);

    return room;
  }
}
