import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IsBoolean, IsString } from "class-validator";
import { HealthService } from "../health_service/health-service.entity";
import { OrderDetail } from "../order_service/order-detail.entity";
import { ServiceFee } from "./service-fee.entity";
import { ServiceTicket } from "./service-ticket.entity";

@Entity("service")
export class Service extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "text", nullable: false })
  @IsString()
  name: string;
  @Column({ type: "text", nullable: true })
  description: string;
  @Column({ type: "bool", default: true })
  @IsBoolean()
  status: boolean;
  @Column({ type: "bool", default: true })
  @IsBoolean()
  isHealthCheck: boolean;
  @Column({ type: "text", nullable: false })
  unit: string;
  @Column({ type: "text", nullable: true })
  healthCheckTemplate: string;
  @Column({ type: "integer", nullable: true })
  estimatedTime: number;

  @OneToMany(() => HealthService, (healthService) => healthService.service)
  healthServices: HealthService[];

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.service)
  orderDetails: OrderDetail[];

  @OneToMany(() => ServiceFee, (serviceFee) => serviceFee.id)
  serviceFees: ServiceFee[];

  @OneToMany(() => ServiceTicket, (serviceTicket) => serviceTicket.service)
  serviceTickets: ServiceTicket[];

  constructor(partial: Partial<Service>) {
    super();
    Object.assign(this, partial);
  }
}
