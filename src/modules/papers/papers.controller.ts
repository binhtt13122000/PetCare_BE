import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Put,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { uploadService } from "src/external/uploadFile.service";
import { PapersService } from "./papers.service";
import { CreatePaper } from "./dto/create-paper.dto";
import { Paper } from "src/entities/paper.entity";
import { FileProducerService } from "../../shared/file/file.producer.service";

@Controller("papers")
export class PapersController {
  constructor(
    private readonly papersService: PapersService,
    private fileProducerService: FileProducerService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor("file"))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreatePaper,
  ): Promise<Paper> {
    try {
      const { url: evidence } = await uploadService.uploadFile(file);
      const paper = {
        ...body,
        evidence,
      };
      return this.papersService.store(paper);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Put()
  @UseInterceptors(FileInterceptor("file"))
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: Paper,
  ): Promise<Paper> {
    try {
      let evidence = null;
      if (file) {
        evidence = await uploadService.uploadFile(file);
        await this.fileProducerService.deleteFile(body.evidence);
      }
      const vaccine = {
        ...body,
        evidence: file ? evidence.url : body.evidence,
      };
      return await this.papersService.update(vaccine.id, vaccine);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
