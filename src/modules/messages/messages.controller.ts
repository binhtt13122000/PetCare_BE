import { Body, Controller, Get, Post, Param, Query } from "@nestjs/common";
import { MessagesService } from "./messages.service";
import { ApiTags } from "@nestjs/swagger";
import { Message } from "src/schemas/message.schema";

@ApiTags("messages")
@Controller("messages")
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async create(@Body() body: Message): Promise<Message> {
    return this.messagesService.create(body);
  }

  @Get("room/:roomId")
  async find(
    @Param("roomId") roomId: string,
    @Query("skip") skip: string,
    @Query("limit") limit: string,
  ): Promise<Message[]> {
    return this.messagesService.findMessageByRoomId(
      roomId,
      Number(limit),
      Number(skip),
    );
  }
}
