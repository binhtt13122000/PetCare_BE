import { MessageEnum } from "src/schemas/message.schema";

export class MessageDTO {
  isSellerMessage: boolean;

  content: string;

  type: MessageEnum;

  createdTime: Date;

  room: string;

  ownerId?: number;

  postId?: number;

  sellerId?: number;
}
