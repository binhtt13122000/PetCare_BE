import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Message, MessageDocument } from "src/schemas/message.schema";

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async create(createMessage: Message): Promise<Message> {
    const createdMessage = new this.messageModel(createMessage);
    return createdMessage.save();
  }

  async findMessageByRoomId(
    roomId: string,
    limit: number,
    skip: number,
  ): Promise<Message[]> {
    return this.messageModel
      .find({
        room: roomId,
      })
      .limit(limit)
      .skip(skip)
      .sort({
        createdTime: "desc",
      })
      .exec();
  }
}
