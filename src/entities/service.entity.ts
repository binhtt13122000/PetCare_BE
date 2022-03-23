import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { HealthService } from "./health-service.entity";
import { OrderDetail } from "./order-detail.entity";

@Entity("service")
export class Service {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "text", nullable: false })
  name: string;
  @Column({ type: "integer", nullable: false })
  price: number;
  @Column({ type: "text", nullable: true })
  description: string;
  @Column({ type: "bool", default: true })
  status: boolean;
  @OneToMany(() => HealthService, (healthService) => healthService.id)
  healthServices: [];
  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.id)
  orderDetails: [];
}
