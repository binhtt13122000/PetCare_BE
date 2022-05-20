import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Service } from "src/entities/service/service.entity";
import { Ticket } from "./ticket.entity";

@Entity("service_ticket")
export class ServiceTicket extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ name: "serviceId" })
  serviceId: number;
  @ManyToOne(() => Service, (service) => service.serviceTickets, {})
  @JoinColumn({ name: "serviceId", referencedColumnName: "id" })
  service: Service;

  @Column({ name: "ticketId" })
  ticketId: number;
  @ManyToOne(() => Ticket, (ticket) => ticket.serviceTickets, {})
  @JoinColumn({ name: "ticketId", referencedColumnName: "id" })
  ticket: Ticket;

  constructor(partial: Partial<ServiceTicket>) {
    super();
    Object.assign(this, partial);
  }
}
