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
  UseGuards,
} from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { IdParams } from "src/common";
import { ServiceFee } from "src/entities/service/service-fee.entity";
import { RoleEnum } from "src/enum";
import { DeleteResult } from "typeorm";
import { hasRoles } from "../auth/decorator/roles.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { CreateServiceFeeDTO } from "./dto/create-service-fee.dto";
import { UpdateServiceFeeDTO } from "./dto/update-service-fee.dto";
import { ServiceFeesService } from "./service-fees.service";

@Controller("service-fees")
@ApiTags("service-fees")
export class ServiceFeesController {
  constructor(private readonly serviceFeesService: ServiceFeesService) {}

  @Get()
  @ApiQuery({
    name: "serviceId",
    required: false,
    type: Number,
  })
  async getAll(@Query("serviceId") serviceId: number): Promise<ServiceFee[]> {
    try {
      if (serviceId) {
        return await this.serviceFeesService.getServiceFeesByService(serviceId);
      }
      return await this.serviceFeesService.index();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(":id")
  async getOne(@Param() params: IdParams): Promise<ServiceFee> {
    try {
      return await this.serviceFeesService.findById(params.id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @hasRoles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(":id")
  async delete(@Param() params: IdParams): Promise<DeleteResult> {
    try {
      return await this.serviceFeesService.delete(params.id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @hasRoles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() body: CreateServiceFeeDTO): Promise<ServiceFee> {
    try {
      return await this.serviceFeesService.store(new ServiceFee(body));
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @hasRoles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put()
  async update(@Body() body: UpdateServiceFeeDTO): Promise<ServiceFee> {
    try {
      return await this.serviceFeesService.update(body.id, body);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
