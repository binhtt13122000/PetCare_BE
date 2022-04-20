import { OrderEnum } from "src/enum";
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
import { Staff } from "../user_management_service/staff.entity";
import { BaseEntity } from "typeorm";

@Entity("order")
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "timestamp without time zone", nullable: true })
  paymentTime: Date;
  @Column({ type: "text", nullable: true })
  paymentMethod: string;
  @Column({ type: "integer", nullable: false })
  provisionalTotal: number;
  @Column({ type: "integer", nullable: false })
  orderTotal: number;
  @Column({ type: "enum", enum: OrderEnum })
  status: OrderEnum;
  @Column({ type: "text", nullable: true })
  description: string;
  //references
  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetail[];

  @Column({ name: "staffId" })
  staffId: number;
  @ManyToOne(() => Staff, (staff) => staff.orders, {})
  @JoinColumn({ name: "staffId", referencedColumnName: "id" })
  staff: Staff;

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

  constructor(partial: Partial<Order>) {
    super();
    Object.assign(this, partial);
  }
}
