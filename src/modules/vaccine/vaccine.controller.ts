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
import { VaccineService } from "./vaccine.service";
import { CreateVaccine } from "./dto/create-vaccine.dto";
import { Vaccine } from "../../entities/vaccine.entity";
import { uploadService } from "src/external/uploadFile.service";
import { FileProducerService } from "src/shared/file/file.producer.service";

@Controller("vaccine")
export class VaccineController {
  constructor(
    private readonly vaccineService: VaccineService,
    private fileProducerService: FileProducerService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor("file"))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateVaccine,
  ): Promise<Vaccine> {
    try {
      const evidence = await uploadService.uploadFile(file);
      const vaccine = {
        ...body,
        evidence: evidence.url,
      };
      return this.vaccineService.store(vaccine);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Put()
  @UseInterceptors(FileInterceptor("file"))
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: Vaccine,
  ): Promise<Vaccine> {
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
      return await this.vaccineService.update(vaccine.id, vaccine);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
