import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { HealthRecord } from "src/entities/health_service/health-record.entity";
import { HealthService } from "src/entities/health_service/health-service.entity";

import { uploadService } from "src/external/uploadFile.service";
import { HealthRecordService } from "../health-record/health-record.service";
import { HealthRecordDTO } from "./dto/create-health-record.dto";

import { HealthServiceDto } from "./dto/health-service.dto";

import { HealthServices } from "./health-service.service";

@Controller("health-service")
@ApiTags("health-service")
export class HealthServiceController {
  constructor(
    private readonly healthServices: HealthServices,
    private healthRecordService: HealthRecordService,
  ) {}

  @Get()
  async getAll(): Promise<HealthService[]> {
    try {
      return await this.healthServices.index();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  // @ApiBody({
  //   schema: {
  //     type: "object",
  //     properties: {
  //       content: { type: "string" },
  //       petStatus: { type: "string" },
  //       serviceId: { type: "integer" },
  //       price: { type: "integer" },
  //       file: {
  //         type: "string",
  //         format: "binary",
  //       },
  //     },
  //   },
  // })

  @Post("/health-record")
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("files"))
  async create(
    @Body() body: HealthRecordDTO,
    @Body()
    arrayHealthService: HealthServiceDto[],
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<HealthService[]> {
    try {
      const listHealthService: Pick<
        HealthService,
        "content" | "evidence" | "healthRecordId" | "petStatus" | "price"
      >[] = [];

      const healthRecord: Partial<HealthRecordDTO> = {
        petId: body.petId,
        isPeriodical: body.isPeriodical,
        weight: body.weight,
        content: body.content,
        petStatus: body.petStatus,
        dateOfExam: body.dateOfExam,
        nextHealthCheck: body.nextHealthCheck,
      };
      const fileEvidence: { url: string; type: string }[] = [];

      files?.map(async (value) => {
        const file = await uploadService.uploadFile(value);
        fileEvidence.push(file);
      });

      const createHealthRecord = await this.healthRecordService.store(
        new HealthRecord(healthRecord),
      );

      // if (arrayHealthService) {
      //   arrayHealthService.map((item, index) => {
      //     listHealthService.push(...listHealthService, {
      //       healthRecordId: createHealthRecord.id,
      //       content: item.content,
      //       petStatus: item.petStatus,
      //       price: item.price,
      //       evidence: fileEvidence[index].url,
      //     });
      //   });
      // }

      return await this.healthServices.saveArray(listHealthService);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
