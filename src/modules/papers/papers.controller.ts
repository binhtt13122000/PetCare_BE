import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Put,
  HttpException,
  HttpStatus,
  Delete,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { uploadService } from "src/external/uploadFile.service";
import { PapersService } from "./papers.service";
import { CreatePaperDTO } from "./dto/create-paper.dto";
import { Paper } from "src/entities/pet_service/paper.entity";
import { FileProducerService } from "../../shared/file/file.producer.service";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { UpdatePaperDTO } from "./dto/update-paper.dto";
import { DeleteResult } from "typeorm";
import { PetsService } from "../pets/pets.service";
import { PetEnum } from "../../enum/index";

@ApiTags("paper")
@Controller("papers")
export class PapersController {
  constructor(
    private readonly papersService: PapersService,
    private petsService: PetsService,
    private fileProducerService: FileProducerService,
  ) {}

  @Post()
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("file"))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreatePaperDTO,
  ): Promise<Paper> {
    try {
      const { url: evidence } = await uploadService.uploadFile(file);
      const paper: Partial<Paper> = {
        ...body,
        evidence,
      };
      return this.papersService.store(new Paper(paper));
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Put()
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("file"))
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UpdatePaperDTO,
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

  @Delete()
  async delete(id: number): Promise<DeleteResult> {
    try {
      const paper = await this.papersService.findById(id);
      const pet = await this.petsService.findById(paper.petId);
      if (pet.status === PetEnum.IN_POST) {
        throw Error("Cannot delete this paper");
      }
      return this.papersService.delete(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
