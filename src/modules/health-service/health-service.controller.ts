import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { IdParams } from "src/common";
import { HealthService } from "src/entities/health_service/health-service.entity";
import { uploadService } from "src/external/uploadFile.service";
import { HealthServiceDTO } from "./dto/create-health-service.dto";
import { HealthServices } from "./health-service.service";

@Controller("health-service")
@ApiTags("health-service")
export class HealthServiceController {
  constructor(private readonly healthServices: HealthServices) {}

  @Get()
  async getAll(): Promise<HealthService[]> {
    try {
      return await this.healthServices.index();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(":id")
  async getOne(@Param() params: IdParams): Promise<HealthService> {
    try {
      return await this.healthServices.findById(params.id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("file"))
  async addServiceToHealthRecord(
    @Body() body: HealthServiceDTO,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<HealthService> {
    try {
      let evidence = null;
      if (file) {
        evidence = await (await uploadService.uploadFile(file)).url;
      }

      const createHealthService: Partial<HealthService> = {
        evidence: evidence,
        serviceId: body.serviceId,
        price: body.price,
        content: body.content,
        petStatus: body.petStatus,
        healthRecordId: body.healthRecordId,
      };
      return await this.healthServices.store(
        new HealthService(createHealthService),
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
