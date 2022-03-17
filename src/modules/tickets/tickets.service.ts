import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { TicketsRepository } from "./tickets.repository";
import { Ticket } from "../../entities/ticket.entity";

@Injectable()
export class TicketsService extends BaseService<Ticket, TicketsRepository> {
  constructor(private readonly ticketsRepository: TicketsRepository) {
    super(ticketsRepository);
  }
}
