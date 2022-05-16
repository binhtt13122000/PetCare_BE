import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Message } from "./message.schema";
import mongoose from "mongoose";
import { RoomStatusEnum } from "src/enum";

export type RoomDocument = Room & Document;

@Schema()
export class Room {
  @Prop()
  @ApiProperty()
  sellerId: number;

  @Prop()
  @ApiProperty()
  ownerId: number;

  @Prop()
  @ApiProperty()
  postId: number;

  @Prop()
  @ApiProperty()
  newestMessageTime: Date;

  @Prop()
  @ApiProperty()
  newestMessage: string;

  @Prop()
  @ApiProperty()
  isSellerMessage: boolean;

  @Prop()
  @ApiProperty()
  createdTime: Date;

  @Prop()
  @ApiProperty({ enum: RoomStatusEnum, default: RoomStatusEnum.CREATED })
  status: RoomStatusEnum;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Message" })
  messages: Message[];
}

export const RoomSchema = SchemaFactory.createForClass(Room);
