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

  @Get("/species/:id")
  async getBreedsBySpeciesId(@Param() params: IdParams): Promise<Breed[]> {
    try {
      return await this.breedsService.getBySpeciesId(params.id);
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
      const breed = await this.breedsService.findById(body.id);
      if (!breed) {
        throw new HttpException("The breed is not found", HttpStatus.NOT_FOUND);
      }
      return await this.breedsService.update(
        body.id,
        new Breed({
          ...breed,
          ...body,
        }),
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch("change-status/:id")
  async changeStatus(@Param() params: IdParams): Promise<Breed> {
    try {
      const breed = await this.breedsService.findById(params.id);
      if (!breed) {
        throw new HttpException("The breed is not found", HttpStatus.NOT_FOUND);
      }
      return this.breedsService.update(params.id, {
        ...breed,
        isActive: !breed.isActive,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(":id")
  async delete(@Param() params: IdParams): Promise<Breed> {
    try {
      const breed = await this.breedsService.findById(params.id);
      if (!breed) {
        throw new HttpException("The breed is not found", HttpStatus.NOT_FOUND);
      }
      if (!breed.isActive) {
        throw new HttpException(
          "The breed is inactive",
          HttpStatus.BAD_REQUEST,
        );
      }
      return this.breedsService.update(params.id, {
        ...breed,
        isActive: false,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
