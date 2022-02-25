import {
  Column,
  Double,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Account } from "./account.entity";
import { OrderDetail } from "./order-detail.entity";

@Entity("order")
export class Order {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "float", nullable: false })
  totalPrice: Double;
  @Column({ type: "bool", default: true })
  status: boolean;
  @Column({ type: "text", nullable: true })
  description: string;
  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.id)
  orderDetails: [];
  @ManyToOne(() => Account, (account) => account.orders, {})
  @JoinColumn({ name: "accountId", referencedColumnName: "id" })
  accountId: number;
}
