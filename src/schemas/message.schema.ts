import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
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
  isSellerMessage: boolean;

  @Prop()
  @ApiProperty()
  content: string;

  @Prop()
  @ApiProperty({ type: "enum", enum: MessageEnum })
  type: MessageEnum;

  @Prop()
  @ApiProperty()
  createdTime: Date;

  @ApiProperty({ type: String })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Room" })
  room: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
