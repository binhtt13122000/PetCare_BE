import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IsBoolean, IsInt, IsString, Length } from "class-validator";
import { HealthService } from "../health_service/health-service.entity";
import { OrderDetail } from "../order_service/order-detail.entity";
import { ServiceFee } from "./service-fee.entity";

@Entity("service")
export class Service extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "text", nullable: false })
  @IsString()
  @Length(0, 32)
  name: string;
  @Column({ type: "integer", nullable: true })
  @IsInt()
  price: number;
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

  @OneToMany(() => HealthService, (healthService) => healthService.service)
  healthServices: HealthService[];

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.service)
  orderDetails: OrderDetail[];

  @OneToMany(() => ServiceFee, (serviceFee) => serviceFee.id)
  serviceFees: ServiceFee[];

  constructor(partial: Partial<Service>) {
    super();
    Object.assign(this, partial);
  }
}
