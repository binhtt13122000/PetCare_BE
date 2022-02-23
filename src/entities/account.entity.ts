import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BreedingTransaction } from "./breeding-transaction.entity";
import { Order } from "./order.entity";
import { PetOwner } from "./pet-owner.entity";
import { Post } from "./post.entity";
import { Role } from "./role.entity";
import { SaleTransaction } from "./sale-transaction.entity";

@Entity("account")
export class Account {
  @PrimaryGeneratedColumn("increment")
  accountId: number;
  @Column({ type: "text" })
  email: string;
  @Column({ type: "text", nullable: false })
  firstName: string;
  @Column({ type: "text", nullable: false })
  lastName: string;
  @Column({ type: "text", nullable: false })
  phoneNumber: string;
  @Column({ type: "text", nullable: false })
  address: string;
  @Column({ type: "bool", nullable: false })
  isMale: boolean;
  @Column({
    type: "timestamp without time zone",
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
  })
  registerTime: Date;
  @ManyToOne(() => Role, (role) => role.accounts, {})
  @JoinColumn({ name: "roleId", referencedColumnName: "roleId" })
  roleId: number;
  @OneToMany(() => PetOwner, (petOwner) => petOwner.petOwnerId)
  petOwners: [];
  @OneToMany(() => Order, (order) => order.orderId)
  orders: [];
  @OneToMany(() => Post, (post) => post.postId)
  posts: [];
  @OneToMany(
    () => SaleTransaction,
    (saleTransaction) => saleTransaction.saleTransactionId,
  )
  saleTransactions: [];
  @OneToMany(
    () => BreedingTransaction,
    (breedingTransaction) => breedingTransaction.breedingTransactionId,
  )
  breedingTransactions: [];
  @Column({ nullable: false })
  status: "abc" | "xxxx";
}
