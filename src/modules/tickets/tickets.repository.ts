import { EntityRepository, Repository } from "typeorm";
import { Ticket } from "src/entities/ticket.entity";

@EntityRepository(Ticket)
export class TicketsRepository extends Repository<Ticket> {}
