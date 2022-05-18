import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Order } from "./order.entity";
import { Service } from "../service/service.entity";

@Entity("order_detail")
export class OrderDetail {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "integer", nullable: false })
  price: number;
  @Column({ type: "integer", nullable: true })
  quantity: number;
  @Column({ type: "integer", nullable: true })
  totalPrice: number;
  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ name: "orderId" })
  orderId: number;
  @ManyToOne(() => Order, (order) => order.orderDetails)
  @JoinColumn({ name: "orderId", referencedColumnName: "id" })
  order: Order;
  @Column({ name: "serviceId" })
  serviceId: number;
  @ManyToOne(() => Service, (service) => service.orderDetails, {})
  @JoinColumn({ name: "serviceId", referencedColumnName: "id" })
  service: Service;
}
