import { ServiceEnum } from "src/enum";
import { MessageEnum } from "src/schemas/message.schema";

export class MessageDTO {
  isSellerMessage: boolean;

  content: string;

  type: MessageEnum;

  createdTime: Date;

  room?: string;

  buyerId?: number;

  postId?: number;

  sellerId?: number;

  roomType?: ServiceEnum;
}
