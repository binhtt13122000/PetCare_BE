import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Ticket } from "src/entities/service/ticket.entity";
import { CreateTicketDTO } from "./dtos/create-ticket.dto";
import { TicketsService } from "./tickets.service";

@Controller("tickets")
@ApiTags("tickets")
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  async getTickets(@Query("branchId") branchId: number): Promise<Ticket[]> {
    if (!branchId) {
      return await this.ticketsService.index();
    }
    return await this.ticketsService.getByBranchId(branchId);
  }

  @Get(":id")
  async getOne(@Param("id") id: number): Promise<Ticket> {
    return this.ticketsService.getOne(id);
  }

  @Post()
  async create(@Body() body: CreateTicketDTO): Promise<Ticket> {
    try {
      return this.ticketsService.store(body);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Put()
  async update(@Body() body: CreateTicketDTO): Promise<Ticket> {
    try {
      return this.ticketsService.store(body);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
