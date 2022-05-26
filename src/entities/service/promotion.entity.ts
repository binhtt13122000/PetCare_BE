import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OneToMany } from "typeorm";
import { Order } from "../order_service/order.entity";
// import { SaleTransaction } from "../transaction_service/sale-transaction.entity";
// import { BreedingTransaction } from "../transaction_service/breeding-transaction.entity";
import { Branch } from "../user_management_service/branch.entity";

@Entity("promotion")
export class Promotion extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "text", nullable: false })
  name: string;
  @Column({ type: "integer", nullable: false })
  promo: number;
  @Column({ type: "timestamp without time zone", nullable: true })
  startTime: Date;
  @Column({ type: "timestamp without time zone", nullable: true })
  expireTime: Date;
  @Column({ type: "text", nullable: true })
  description: string;
  @Column({ type: "bool", nullable: false, default: true })
  status: boolean;
  @Column({ type: "integer", nullable: false })
  applyMoney: number;
  @Column({ type: "integer", nullable: false })
  maxMoneyPromo: number;

  @Column({ type: "integer", nullable: true, default: 0 })
  point: number;

  @Column({ name: "branchId", nullable: true })
  branchId: number;
  @ManyToOne(() => Branch, (branch) => branch.promotions, {})
  @JoinColumn({ name: "branchId", referencedColumnName: "id" })
  branch: Branch;

  @OneToMany(() => Order, (order) => order.promotion)
  orders: Order[];

  // @OneToMany(
  //   () => SaleTransaction,
  //   (saleTransaction) => saleTransaction.promotion,
  // )
  // saleTransactions: SaleTransaction[];

  // @OneToMany(
  //   () => BreedingTransaction,
  //   (breedingTransaction) => breedingTransaction.promotion,
  // )
  // breedingTransactions: BreedingTransaction[];

  constructor(partial: Partial<Promotion>) {
    super();
    Object.assign(this, partial);
  }
}
