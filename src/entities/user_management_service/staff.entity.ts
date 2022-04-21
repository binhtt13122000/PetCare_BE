import { IsNumber, Max, Min, IsInt } from "class-validator";
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  BaseEntity,
} from "typeorm";
import { Order } from "../order_service/order.entity";
import { Post } from "../transaction_service/post.entity";
import { BreedingTransaction } from "../transaction_service/breeding-transaction.entity";

@Entity("staff")
export class Staff extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "float", nullable: false, default: 0 })
  @Min(0)
  @Max(5)
  @IsNumber()
  start: number;
  @Column({ type: "int", nullable: true, default: 0 })
  @Min(0)
  @IsInt()
  numberReviewers: number;

  @Column({ type: "int", nullable: false })
  accountId: number;

  @OneToMany(() => Order, (order) => order.staff)
  orders: Order[];

  @OneToMany(() => Post, (post) => post.staff)
  posts: Post[];

  @OneToMany(
    () => BreedingTransaction,
    (breedingTransaction) => breedingTransaction.staff,
  )
  breedingTransactions: BreedingTransaction[];

  constructor(partial: Partial<Staff>) {
    super();
    Object.assign(this, partial);
  }
}
