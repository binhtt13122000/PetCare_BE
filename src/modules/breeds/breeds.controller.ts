import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { IdParams } from "src/common";
import { Breed } from "src/entities/pet_service/breed.entity";
import { DeleteResult } from "typeorm";
import { BreedsService } from "./breeds.service";
import { CreateBreedsDTO } from "./dto/create-breeds.dto";
import { UpdateBreedsDTO } from "./dto/update-breeds.dto";

@Controller("breeds")
@ApiTags("breeds")
export class BreedsController {
  constructor(private readonly breedsService: BreedsService) {}

  @Get(":id")
  async getOne(@Param() params: IdParams): Promise<Breed> {
    try {
      return await this.breedsService.findById(params.id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async getAll(): Promise<Breed[]> {
    try {
      return await this.breedsService.index();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  async create(@Body() body: CreateBreedsDTO): Promise<Breed> {
    try {
      return await this.breedsService.store(new Breed(body));
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Put()
  async update(@Body() body: UpdateBreedsDTO): Promise<Breed> {
    try {
      return await this.breedsService.update(body.id, body);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(":id")
  async delete(@Param() params: IdParams): Promise<Breed> {
    try {
      const breed = await this.breedsService.findById(params.id);
      if (!breed.isActive) {
        throw Error("Cannot delete this breed");
      }
      return this.breedsService.update(params.id, {
        ...breed,
        isActive: false,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch("change-status/:id")
  async changeStatus(@Param("id") id: string): Promise<Breed> {
    try {
      const breed = await this.breedsService.findById(id);

      return this.breedsService.update(id, {
        ...breed,
        isActive: !breed.isActive,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
