import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Ticket } from "src/entities/service/ticket.entity";
import { NotificationEnum, PetEnum, TicketStatusEnum } from "src/enum";
import { NotificationProducerService } from "src/shared/notification/notification.producer.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { BranchesService } from "../branches/branches.service";
import { CustomerService } from "../customer/customer.service";
import { PetsService } from "../pets/pets.service";
import { UserService } from "../users/user.service";
import ChangeStatusTicketDTO from "./dtos/change-status-ticket.dto";
import { CreateTicketDTO } from "./dtos/create-ticket.dto";
import { TicketsService } from "./tickets.service";

@Controller("tickets")
@ApiTags("tickets")
export class TicketsController {
  constructor(
    private readonly ticketsService: TicketsService,
    private readonly customerService: CustomerService,
    private readonly userService: UserService,
    private readonly branchService: BranchesService,
    private readonly petService: PetsService,
    private notificationProducerService: NotificationProducerService,
  ) {}

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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("customers/:id")
  async getByCustomerId(@Param("id") id: number): Promise<Ticket> {
    return this.ticketsService.getTicketsByUserId(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() body: CreateTicketDTO): Promise<Ticket> {
    try {
      const customerInstance = await this.customerService.findById(
        body.customerId,
      );
      const branchInstance = await this.branchService.findById(body.branchId);
      if (!customerInstance) {
        throw new NotFoundException("Can not found customer!");
      }
      if (!branchInstance) {
        throw new NotFoundException("Can not found branch!");
      }

      const accountBranchInstance = await this.userService.findByPhoneNumber(
        branchInstance.phoneNumber || "",
      );
      const tickets = await this.ticketsService.getTicketsByBranchId(
        body.branchId,
        body.meetingDate,
      );
      if (tickets && tickets.length > 0) {
        tickets.forEach((item) => {
          if (item.startTime < body.endTime && body.startTime < item.endTime) {
            throw new HttpException(
              "Conflict time with another ticket!",
              HttpStatus.CONFLICT,
            );
          }
        });
      }
      if (body && body.serviceTickets.length > 0) {
        body.serviceTickets.forEach(async (item) => {
          if (item.petId) {
            const pet = await this.petService.findById(item.petId);
            if (pet && pet.status !== PetEnum.NORMAL) {
              throw new HttpException(
                "Your pet exists in another post!",
                HttpStatus.BAD_REQUEST,
              );
            }
          }
        });
      }
      let typeNotification = "";
      typeNotification = NotificationEnum.CREATED_TICKET;
      const ticketInstance = await this.ticketsService.store(body);
      await this.notificationProducerService.sendMessage(
        {
          body: "Your branch has a new ticket registered.",
          title: "New Ticket",
          type: typeNotification,
          metadata: String(ticketInstance.id),
        },
        accountBranchInstance.id,
      );
      return ticketInstance;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put()
  async update(@Body() body: CreateTicketDTO): Promise<Ticket> {
    try {
      return this.ticketsService.store(body);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
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
      if (body.status === TicketStatusEnum.CANCELED) {
        ticket.reasonCancel = body.reasonCancel;
      }
      return ticket.save();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
