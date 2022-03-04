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

@Controller("papers")
export class PapersController {
  constructor(private readonly papersService: PapersService) {}

  @Post()
  @UseInterceptors(FileInterceptor("file"))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreatePaper,
  ): Promise<Paper> {
    try {
      const evidence = await uploadService.uploadFile(file);
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
        await uploadService.removeImage(body.evidence);
      }
      const vaccine = {
        ...body,
        evidence: file ? evidence : body.evidence,
      };
      return await this.papersService.update(vaccine.id, vaccine);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
