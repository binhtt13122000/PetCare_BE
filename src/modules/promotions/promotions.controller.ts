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
import { Promotion } from "src/entities/service/promotion.entity";
import { DeleteResult } from "typeorm";
import { CreatePromotionDTO } from "./dto/create-promotion.dto";
import { UpdatePromotionDTO } from "./dto/update-promotion.dto";
import { PromotionsService } from "./promotions.service";

@Controller("promotions")
@ApiTags("promotions")
export class PromotionsController {
  constructor(private readonly promotionsService: PromotionsService) {}

  @Get()
  async getAll(): Promise<Promotion[]> {
    try {
      return await this.promotionsService.index();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(":id")
  async getOne(@Param() params: IdParams): Promise<Promotion> {
    try {
      return await this.promotionsService.findById(params.id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  async create(@Body() body: CreatePromotionDTO): Promise<Promotion> {
    try {
      return await this.promotionsService.store(new Promotion(body));
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Put()
  async update(@Body() body: UpdatePromotionDTO): Promise<Promotion> {
    try {
      return await this.promotionsService.update(body.id, body);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(":id")
  async delete(@Param() params: IdParams): Promise<DeleteResult> {
    try {
      const promotion = await this.promotionsService.findById(params.id);
      if (promotion.status) {
        throw Error("Cannot delete this promotion");
      }
      return await this.promotionsService.delete(promotion.id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(":id")
  async changeStatus(@Param() params: IdParams): Promise<Promotion> {
    try {
      const promotion = await this.promotionsService.findById(params.id);

      return await this.promotionsService.update(promotion.id, {
        ...promotion,
        status: !promotion.status,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
