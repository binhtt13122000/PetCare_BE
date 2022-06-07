import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Ticket } from "src/entities/service/ticket.entity";
import ChangeStatusTicketDTO from "./dtos/change-status-ticket.dto";
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

  @Get("branches/:id")
  async getByBranchId(
    @Param("id") id: number,
    @Query("date") date: Date,
  ): Promise<Ticket[]> {
    return this.ticketsService.getTicketsByBranchId(id, date);
  }

  @Post()
  async create(@Body() body: CreateTicketDTO): Promise<Ticket> {
    try {
      return this.ticketsService.store(body);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Put()
  async update(@Body() body: CreateTicketDTO): Promise<Ticket> {
    try {
      return this.ticketsService.store(body);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch()
  async changeStatusTicket(
    @Body() body: ChangeStatusTicketDTO,
  ): Promise<Ticket> {
    try {
      if (!body.id) {
        throw new BadRequestException();
      }
      const ticket = await this.ticketsService.findById(body.id);
      if (!ticket) {
        throw new HttpException("NOT FOUND", HttpStatus.NOT_FOUND);
      }
      ticket.status = body.status;
      return ticket.save();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
