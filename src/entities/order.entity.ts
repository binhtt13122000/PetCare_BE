import {
  Column,
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
  @Column({ type: "integer", nullable: false })
  totalPrice: number;
  @Column({ type: "bool", default: true })
  status: boolean;
  @Column({ type: "text", nullable: true })
  description: string;
  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.id)
  orderDetails: [];

  @Column({ name: "accountId" })
  accountId: number;
  @ManyToOne(() => Account, (account) => account.orders, {})
  @JoinColumn({ name: "accountId", referencedColumnName: "id" })
  account: Account;
}
