import { OrderEnum, PaymentOrderMethodEnum } from "src/enum";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OrderDetail } from "./order-detail.entity";
import { Promotion } from "../service/promotion.entity";
import { Customer } from "../user_management_service/customer.entity";
import { Branch } from "../user_management_service/branch.entity";
import { BaseEntity } from "typeorm";

@Entity("order")
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "timestamp without time zone", nullable: true })
  paymentTime: Date;
  @Column({ type: "enum", enum: PaymentOrderMethodEnum, nullable: true })
  paymentMethod: PaymentOrderMethodEnum;
  @Column({ type: "integer", nullable: false })
  provisionalTotal: number;
  @Column({ type: "integer", nullable: false })
  orderTotal: number;
  @Column({ type: "integer", nullable: true })
  point: number;
  @Column({ type: "integer", nullable: true })
  payment: number;
  @Column({ type: "enum", enum: OrderEnum })
  status: OrderEnum;
  @Column({ type: "text", nullable: true })
  description: string;
  //references
  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetail[];

  @Column({ name: "branchId" })
  branchId: number;
  @ManyToOne(() => Branch, (branch) => branch.orders, {})
  @JoinColumn({ name: "branchId", referencedColumnName: "id" })
  branch: Branch;

  @Column({ name: "promotionId", nullable: true })
  promotionId: number;
  @ManyToOne(() => Promotion, (promotion) => promotion.orders, {})
  @JoinColumn({ name: "promotionId", referencedColumnName: "id" })
  promotion: Promotion;
  @Column({ name: "customerId" })
  customerId: number;
  @ManyToOne(() => Customer, (customer) => customer.orders, {})
  @JoinColumn({ name: "customerId", referencedColumnName: "id" })
  customer: Customer;

  @Column({
    type: "timestamp without time zone",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  registerTime: Date;

  constructor(partial: Partial<Order>) {
    super();
    Object.assign(this, partial);
  }
}
