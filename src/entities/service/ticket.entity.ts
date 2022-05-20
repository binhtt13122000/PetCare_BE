import { TicketStatusEnum } from "src/enum";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Branch } from "../user_management_service/branch.entity";
import { Customer } from "../user_management_service/customer.entity";
import { ServiceTicket } from "./service-ticket.entity";

@Entity("ticket")
export class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({
    type: "timestamp without time zone",
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdTime: Date;
  @Column({
    type: "timestamp without time zone",
    nullable: false,
  })
  meetingDate: Date;
  @Column({ type: "integer", nullable: true })
  startTime: number;
  @Column({ type: "integer", nullable: true })
  endTime: number;
  @Column({ name: "branchId" })
  branchId: number;
  @ManyToOne(() => Branch, (branch) => branch.tickets, {})
  @JoinColumn({ name: "branchId", referencedColumnName: "id" })
  branch: Branch;

  @Column({ name: "customerId" })
  customerId: number;
  @ManyToOne(() => Customer, (customer) => customer.tickets, {})
  @JoinColumn({ name: "customerId", referencedColumnName: "id" })
  customer: Customer;

  @OneToMany(() => ServiceTicket, (serviceTicket) => serviceTicket.ticket, {
    cascade: true,
  })
  serviceTickets: ServiceTicket[];

  @Column({ type: "enum", enum: TicketStatusEnum })
  status: TicketStatusEnum;
}
