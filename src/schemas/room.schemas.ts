import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Message } from "./message.schema";
import mongoose from "mongoose";
import { RoomStatusEnum } from "src/enum";

export type RoomDocument = Room & Document;

@Schema()
export class Room {
  @ApiProperty({ required: false })
  _id?: string;

  @Prop()
  @ApiProperty()
  sellerId: number;

  @Prop()
  @ApiProperty()
  buyerId: number;

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

  @Prop({ required: false })
  @ApiProperty({ required: false })
  sellerLastViewTime?: Date;

  @Prop({ required: false })
  @ApiProperty({ required: false })
  buyerLastViewTime?: Date;

  @Prop({ required: false })
  @ApiProperty({ required: false })
  transactionTime?: Date;

  @Prop({ required: false })
  @ApiProperty({ required: false })
  transactionPlace?: string;

  @Prop({ description: false })
  @ApiProperty({ required: false })
  description?: string;

  @Prop()
  @ApiProperty()
  createdTime: Date;

  @Prop({ required: false })
  @ApiProperty({ required: false })
  transactionId?: number;

  @Prop({ required: false })
  @ApiProperty({ required: false })
  type?: "SALE" | "BREED";

  @Prop()
  @ApiProperty({ enum: RoomStatusEnum, default: RoomStatusEnum.CREATED })
  status: RoomStatusEnum;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Message" })
  messages?: Message[];
}

export const RoomSchema = SchemaFactory.createForClass(Room);
