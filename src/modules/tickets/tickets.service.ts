import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { Ticket } from "src/entities/service/ticket.entity";
import { TicketsRepository } from "./tickets.repository";

@Injectable()
export class TicketsService extends BaseService<Ticket, TicketsRepository> {
  constructor(private readonly ticketsRepository: TicketsRepository) {
    super(ticketsRepository);
  }

  getByBranchId(branchId: number): Promise<Ticket[]> {
    return this.ticketsRepository.find({
      where: {
        branchId: branchId,
      },
      relations: ["customer"],
    });
  }

  getOne(id: number): Promise<Ticket> {
    return this.ticketsRepository.findOne({
      where: {
        id: id,
      },
      relations: [
        "serviceTickets",
        "serviceTickets.service",
        "serviceTickets.service.serviceFees",
        "customer",
        "branch",
      ],
    });
  }

  findById(id: number): Promise<Ticket> {
    return this.ticketsRepository.findOne({
      where: {
        id: id,
      },
      relations: ["serviceTickets", "serviceTickets.service"],
    });
  }

  getTicketsByBranchId(branchId: number, date: Date): Promise<Ticket[]> {
    return this.ticketsRepository.find({
      where: {
        branchId: branchId,
        meetingDate: date,
      },
      order: {
        startTime: "ASC",
      },
    });
  }

  getTicketsByUserId(customerId: number, date: Date): Promise<Ticket[]> {
    return this.ticketsRepository.find({
      where: {
        customerId: customerId,
        meetingDate: date,
      },
      relations: ["branch"],
      order: {
        startTime: "ASC",
      },
    });
  }
}
