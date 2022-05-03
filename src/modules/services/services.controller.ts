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
import { ShopService } from "./services.service";
import { CreateServiceDTO } from "./dto/create-service.dto";
import { Service } from "src/entities/service/service.entity";
import { UpdateServiceDTO } from "./dto/update-service.dto";
import { IdParams } from "src/common";

@Controller("services")
@ApiTags("services")
export class ServicesController {
  constructor(private readonly shopService: ShopService) {}

  @Get(":id")
  async getOne(@Param() params: IdParams): Promise<Service> {
    try {
      return await this.shopService.findById(params.id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  async create(@Body() body: CreateServiceDTO): Promise<Service> {
    try {
      return await this.shopService.store(new Service(body));
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Put()
  async update(@Body() body: UpdateServiceDTO): Promise<Service> {
    try {
      return await this.shopService.update(body.id, body);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete()
  async delete(id: number): Promise<Service> {
    try {
      const service = await this.shopService.findById(id);
      return this.shopService.update(id, { ...service, status: false });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch("/change-status")
  async changeStatus(id: number): Promise<Service> {
    try {
      const service = await this.shopService.findById(id);
      return this.shopService.update(id, {
        ...service,
        status: !service.status,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
