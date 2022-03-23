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
  @Column({ type: "text", nullable: true })
  email: string;
  @Column({ type: "text", nullable: false })
  firstName: string;
  @Column({ type: "text", nullable: false })
  lastName: string;
  @Column({ type: "text", nullable: false, unique: true })
  phoneNumber: string;
  @Column({ type: "text", nullable: true })
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
  @OneToMany(() => PetOwner, (petOwner) => petOwner.account)
  petOwners: PetOwner[];
  @OneToMany(() => Order, (order) => order.account)
  orders: Order[];
  @OneToMany(() => Post, (post) => post.seller)
  posts: Post[];

  @OneToMany(() => Post, (post) => post.staff)
  staffPosts: Post[];
  @OneToMany(() => SaleTransaction, (saleTransaction) => saleTransaction.id)
  saleTransactions: SaleTransaction[];
  @OneToMany(
    () => BreedingTransaction,
    (breedingTransaction) => breedingTransaction.id,
  )
  breedingTransactions: BreedingTransaction[];

  @OneToMany(() => Promotion, (promotion) => promotion.account)
  promotions: Promotion[];

  constructor(partial: Partial<Account>) {
    super();
    Object.assign(this, partial);
  }
}
