import {
  Column,
  Double,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { HealthService } from "./health-service.entity";
import { OrderDetail } from "./order-detail.entity";

export class Service {
  @PrimaryGeneratedColumn("increment")
  serviceId: number;
  @Column({ type: "text", nullable: false })
  name: string;
  @Column({ type: "float", nullable: false })
  price: Double;
  @Column({ type: "text", nullable: true })
  description: string;
  @Column({ type: "bool", default: true })
  status: boolean;

  @OneToMany(
    () => HealthService,
    (healthService) => healthService.healthServiceId,
  )
  healthServices: [];
  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.orderDetailId)
  orderDetails: [];
}
