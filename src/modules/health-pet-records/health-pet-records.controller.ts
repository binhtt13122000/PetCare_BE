import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { IdParams } from "src/common";
import { CreateHealthPetRecordDTO } from "./dto/create-health-pet-record.dto";
import GetHealthPetRecordQuery from "./dto/get-health-pet-record.dto";
import { UpdateHealthPetRecordDTO } from "./dto/update-health-pet-record.dto";
import { HealthPetRecordsService } from "./health-pet-records.service";
import { HealthPetRecord } from "src/entities/pet_service/health-pet-record.entity";
import { HttpService } from "@nestjs/axios";
import { PetsService } from "../pets/pets.service";
import { map } from "rxjs";
import { HealthPetRecordEnum } from "src/enum";

@Controller("health-pet-records")
@ApiTags("health-pet-records")
export class HealthPetRecordsController {
  constructor(
    private readonly healthPetRecordsService: HealthPetRecordsService,
    private readonly httpService: HttpService,
    private readonly petService: PetsService,
  ) {}

  @Get()
  async getAll(
    @Query()
    query: GetHealthPetRecordQuery,
  ): Promise<HealthPetRecord[]> {
    try {
      return await this.healthPetRecordsService.getHealthPetRecordsByPetId(
        query.petId,
        query.type,
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(":id")
  async getOne(@Param() params: IdParams): Promise<HealthPetRecord> {
    try {
      return await this.healthPetRecordsService.findById(params.id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(":id")
  async delete(@Param() params: IdParams): Promise<unknown> {
    try {
      const deleteAction = await this.healthPetRecordsService.delete(params.id);
      const pet = await this.petService.getOne(params.id, true);
      if (pet.specialMarkings) {
        return this.httpService
          .post("/api/setData", {
            no: pet.specialMarkings,
            content: {
              current: pet,
              write: "A health pet record is removed",
            },
            type: "DELETE",
            date: new Date(new Date().getTime() + 7 * 60 * 60 * 1000),
          })
          .pipe(map((response) => response.data));
      } else {
        return deleteAction;
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  async create(@Body() body: CreateHealthPetRecordDTO): Promise<unknown> {
    try {
      const healthPetRecord = await this.healthPetRecordsService.store(
        new HealthPetRecord(body),
      );
      const pet = await this.petService.getOne(body.petId, true);
      if (pet.specialMarkings) {
        let script = "";
        if (body.type === HealthPetRecordEnum.VACCINE) {
          script = "The dog has been given a new vaccine";
        } else if (body.type === HealthPetRecordEnum.HELMINTHIC) {
          script = "The dog has been given a new deworming";
        } else if (body.type === HealthPetRecordEnum.TICKS) {
          script = "The dog has been given a new tick treatment";
        }
        return this.httpService
          .post("/api/setData", {
            no: pet.specialMarkings,
            content: {
              current: pet,
              write: script,
            },
            type: "UPDATE",
            date: body.dateOfInjection,
          })
          .pipe(map((response) => response.data));
      } else {
        return healthPetRecord;
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Put()
  async update(
    @Body() body: UpdateHealthPetRecordDTO,
  ): Promise<HealthPetRecord> {
    try {
      return await this.healthPetRecordsService.update(body.id, body);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
