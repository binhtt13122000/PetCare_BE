import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Message } from "./message.schema";
import mongoose from "mongoose";

export type RoomDocument = Room & Document;

@Schema()
export class Room {
  @Prop()
  @ApiProperty()
  participant1: number;

  @Prop()
  @ApiProperty()
  participant2: number;

  @Prop()
  @ApiProperty()
  postId: number;

  @Prop()
  @ApiProperty()
  newestMessageTime: Date;

  @Prop()
  @ApiProperty()
  createdTime: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Message" })
  message: Message[];
}

export const RoomSchema = SchemaFactory.createForClass(Room);
