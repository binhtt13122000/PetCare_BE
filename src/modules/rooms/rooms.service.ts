import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Room, RoomDocument } from "src/schemas/room.schemas";

@Injectable()
export class RoomsService {
  constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>) {}

  async create(createRoomDTO: Room): Promise<Room> {
    const createdRoom = new this.roomModel(createRoomDTO);
    return createdRoom.save();
  }

  async findAll(): Promise<Room[]> {
    return this.roomModel.find().exec();
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

  // async getMessagesByRoomId(roomId: number): Promise<RoomDocument[]> {
  //   return this.roomModel.findById(roomId).populate("fans").exec();
  // }
}
