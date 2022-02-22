import {
  Column,
  Double,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Account } from "./account.entity";
import { OrderDetail } from "./order-detail.entity";

export class Order {
  @PrimaryGeneratedColumn("increment")
  orderId: number;
  @Column({ type: "float", nullable: false })
  totalPrice: Double;
  @Column({ type: "bool", default: true })
  status: boolean;
  @Column({ type: "text", nullable: true })
  description: string;
  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.orderDetailId)
  orderDetails: [];
  @ManyToOne(() => Account, (account) => account.orders, {})
  @JoinColumn({ name: "accountId", referencedColumnName: "accountId" })
  accountId: number;
}
