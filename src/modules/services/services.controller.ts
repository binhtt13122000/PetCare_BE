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
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { ShopService } from "./services.service";
import { CreateServiceDTO } from "./dto/create-service.dto";
import { Service } from "src/entities/service/service.entity";
import { UpdateServiceDTO } from "./dto/update-service.dto";
import { IdParams } from "src/common";
import { ServiceFeesService } from "../service-fees/service-fees.service";
import { ServiceFee } from "../../entities/service/service-fee.entity";
import { Ticket } from "src/entities/service/ticket.entity";
import { TicketsService } from "../tickets/tickets.service";
import { RolesGuard } from "../auth/guards/roles.guard";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { hasRoles } from "../auth/decorator/roles.decorator";
import { RoleEnum } from "src/enum";

@Controller("services")
@ApiTags("services")
export class ServicesController {
  constructor(
    private readonly shopService: ShopService,
    private readonly serviceFeesService: ServiceFeesService,
    private readonly ticketService: TicketsService,
  ) {}

  @ApiQuery({
    name: "speciesId",
    type: Number,
    required: false,
  })
  @Get()
  async getService(@Query("speciesId") speciesId: number): Promise<Service[]> {
    try {
      return await this.shopService.getAll(speciesId);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get("/tickets/:id")
  async getTicket(@Param() params: IdParams): Promise<Ticket> {
    try {
      return await this.ticketService.findById(params.id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(":id")
  async getOne(@Param() params: IdParams): Promise<Service> {
    try {
      return await this.shopService.getOne(params.id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @hasRoles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() body: CreateServiceDTO): Promise<Service> {
    try {
      const { price, ...rest } = body;
      const serviceFee = new ServiceFee({
        max: undefined,
        min: 0,
        price: price,
      });
      const service = new Service({
        ...rest,
        serviceFees: [serviceFee],
      });
      return await this.shopService.store(service);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @hasRoles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put()
  async update(@Body() body: UpdateServiceDTO): Promise<Service> {
    try {
      return await this.shopService.update(body.id, body);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @hasRoles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(":id")
  async delete(@Param("id") id: string): Promise<Service> {
    try {
      const service = await this.shopService.findById(id);
      return this.shopService.update(id, { ...service, status: false });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @hasRoles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch("change-status/:id")
  async changeStatus(@Param("id") id: string): Promise<Service> {
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
