import {
  BaseEntity,
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
import { Promotion } from "./promotion.entity";
import { Role } from "./role.entity";
import { SaleTransaction } from "./sale-transaction.entity";

@Entity("account")
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
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

  @Column({ type: "bool", default: true })
  isActive: boolean;

  @Column({ name: "roleId" })
  roleId: number;

  @ManyToOne(() => Role, (role) => role.accounts, {})
  @JoinColumn({ name: "roleId", referencedColumnName: "id" })
  role: Role;
  @OneToMany(() => PetOwner, (petOwner) => petOwner.id)
  petOwners: [];
  @OneToMany(() => Order, (order) => order.id)
  orders: [];
  @OneToMany(() => Post, (post) => post.id)
  posts: [];
  @OneToMany(() => SaleTransaction, (saleTransaction) => saleTransaction.id)
  saleTransactions: [];
  @OneToMany(
    () => BreedingTransaction,
    (breedingTransaction) => breedingTransaction.id,
  )
  breedingTransactions: [];

  @OneToMany(() => Promotion, (promotion) => promotion.id)
  promotions: [];

  constructor(partial: Partial<Account>) {
    super();
    Object.assign(this, partial);
  }
}
