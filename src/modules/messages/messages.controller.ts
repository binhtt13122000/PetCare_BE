import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Query,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { MessagesService } from "./messages.service";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { Message } from "src/schemas/message.schema";
import { FileInterceptor } from "@nestjs/platform-express";
import { uploadService } from "src/external/uploadFile.service";
import { UploadFileDTO } from "./messages.dto";

@ApiTags("messages")
@Controller("messages")
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async create(@Body() body: Message): Promise<Message> {
    return this.messagesService.create(body);
  }

  @ApiConsumes("multipart/form-data")
  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() body: UploadFileDTO,
  ): Promise<{ url: string }> {
    try {
      const { url } = await uploadService.uploadFile(file);
      return { url };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
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
