import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
} from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { Media } from "src/entities/media.entity";
import { Ticket } from "src/entities/ticket.entity";
import { uploadService } from "src/external/uploadFile.service";
import { TicketsService } from "./tickets.service";

@Controller("tickets")
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: "files", maxCount: 4 }]))
  async create(
    @UploadedFiles()
    files: {
      files?: Express.Multer.File[];
    },
    @Body() body: Partial<Ticket>,
  ): Promise<Ticket> {
    const evidences: Media[] = await Promise.all(
      files.files?.map(async (value) => {
        const { url, type } = await uploadService.uploadFile(value);
        return new Media({
          url: url,
          status: true,
          type: type === "image/jpeg" ? "image" : "video",
        });
      }),
    );
    body.medias = evidences;
    return this.ticketsService.store(new Ticket(body));
  }
}
