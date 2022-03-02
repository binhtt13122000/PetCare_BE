import {
  Column,
  Double,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Order } from "./order.entity";
import { Service } from "./service.entity";

@Entity("order_detail")
export class OrderDetail {
  @PrimaryGeneratedColumn("increment")
  id: number;
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

  @Column({ name: "orderId" })
  orderId: number;
  @ManyToOne(() => Order, (order) => order.orderDetails, {})
  @JoinColumn({ name: "orderId", referencedColumnName: "id" })
  order: Order;

  @Column({ name: "serviceId" })
  serviceId: number;
  @ManyToOne(() => Service, (service) => service.orderDetails, {})
  @JoinColumn({ name: "serviceId", referencedColumnName: "id" })
  service: Service;
}
