import {
  Column,
  Double,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Order } from "./order.entity";
import { Service } from "./service.entity";

export class OrderDetail {
  @PrimaryGeneratedColumn("increment")
  orderDetailId: number;
  @Column({ type: "float", nullable: false })
  price: Double;
  @Column({ type: "date", nullable: false })
  date: Date;
  @Column({ type: "int", nullable: false })
  quantity: number;
  @Column({ type: "bool", default: true })
  status: boolean;
  @Column({ type: "text", nullable: true })
  description: string;
  @ManyToOne(() => Order, (order) => order.orderDetails, {})
  @JoinColumn({ name: "orderId", referencedColumnName: "orderId" })
  orderId: number;
  @ManyToOne(() => Service, (service) => service.orderDetails, {})
  @JoinColumn({ name: "serviceId", referencedColumnName: "serviceId" })
  serviceId: number;
}
