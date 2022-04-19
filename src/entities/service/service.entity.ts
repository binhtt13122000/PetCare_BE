import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsBoolean, IsInt, IsString, Length } from "class-validator";
import { HealthService } from "../health_service/health-service.entity";
import { OrderDetail } from "../order_service/order-detail.entity";

@Entity("service")
export class Service {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "text", nullable: false })
  @IsString()
  @Length(0, 32)
  name: string;
  @Column({ type: "integer", nullable: false })
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

  @OneToMany(() => HealthService, (healthService) => healthService.service)
  healthServices: HealthService[];

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.service)
  orderDetails: OrderDetail[];
}
