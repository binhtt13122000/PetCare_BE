import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Room } from "src/schemas/room.schemas";
import mongoose from "mongoose";

export type MessageDocument = Message & Document;
export enum MessageEnum {
  NORMAL = "NORMAL",
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
}
@Schema()
export class Message {
  @Prop()
  @ApiProperty()
  senderId: number;

  @Prop()
  @ApiProperty()
  content: string;

  @Prop()
  @ApiProperty({ type: "enum", enum: MessageEnum })
  type: MessageEnum;

  @Prop()
  @ApiProperty()
  createdTime: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Room" })
  room: Room;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
