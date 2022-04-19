import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Customer } from "../user_management_service/customer.entity";
import { OneToMany } from "typeorm";
import { Order } from "../order_service/order.entity";
import { SaleTransaction } from "../transaction_service/sale-transaction.entity";
import { BreedingTransaction } from "../transaction_service/breeding-transaction.entity";

@Entity("promotion")
export class Promotion {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "text", nullable: false })
  name: string;
  @Column({ type: "integer", nullable: false })
  promo: number;
  @Column({ type: "date", nullable: false })
  startTime: Date;
  @Column({ type: "date", nullable: false })
  expireTime: Date;
  @Column({ type: "text", nullable: true })
  description: string;
  @Column({ type: "bool", nullable: false, default: true })
  status: boolean;
  @Column({ type: "integer", nullable: false })
  applyMoney: number;
  @Column({ type: "integer", nullable: false })
  maxMoneyPromo: number;

  @Column({ name: "customerId", nullable: true })
  accountId: number;
  @ManyToOne(() => Customer, (customer) => customer.promotions, {})
  @JoinColumn({ name: "customerId", referencedColumnName: "id" })
  customer: Customer;

  @OneToMany(() => Order, (order) => order.promotion)
  orders: Order[];

  @OneToMany(
    () => SaleTransaction,
    (saleTransaction) => saleTransaction.promotion,
  )
  saleTransactions: SaleTransaction[];

  @OneToMany(
    () => BreedingTransaction,
    (breedingTransaction) => breedingTransaction.promotion,
  )
  breedingTransactions: BreedingTransaction[];
}
