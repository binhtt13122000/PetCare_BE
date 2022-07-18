import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Media } from "./media.entity";
import { Pet } from "../pet_service/pet.entity";
import { BreedingTransaction } from "./breeding-transaction.entity";
import { SaleTransaction } from "./sale-transaction.entity";
import { Branch } from "../user_management_service/branch.entity";
import { Customer } from "../user_management_service/customer.entity";
import { PostEnum, ServiceEnum } from "src/enum";

@Entity("post")
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "text", nullable: false })
  title: string;
  @Column({ type: "integer", nullable: false })
  sellerReceive: number;
  @Column({ type: "integer", nullable: false })
  shopFee: number;
  @Column({ type: "integer", nullable: false })
  transactionTotal: number;
  @Column({
    type: "timestamp without time zone",
    nullable: false,
  })
  createTime: Date;
  @Column({ type: "timestamp without time zone", nullable: true })
  meetingTime: Date;
  @Column({
    type: "timestamp without time zone",
    nullable: true,
  })
  cancelTime: Date;
  @Column({ type: "enum", enum: ServiceEnum })
  type: ServiceEnum;
  @Column({ type: "text", nullable: true })
  description: string;
  @Column({ type: "enum", enum: PostEnum })
  status: PostEnum;
  @Column({ type: "text", nullable: true })
  reasonCancel: string;
  @Column({ type: "text", nullable: true })
  reasonReject: string;

  //references
  @Column({ name: "petId" })
  petId: number;
  @ManyToOne(() => Pet, (pet) => pet.posts, {})
  @JoinColumn({ name: "petId", referencedColumnName: "id" })
  pet: Pet;

  @Column({ name: "branchId", nullable: true })
  branchId: number;
  @ManyToOne(() => Branch, (branch) => branch.posts, {})
  @JoinColumn({ name: "branchId", referencedColumnName: "id" })
  branch: Branch;

  @Column({ name: "customerId" })
  customerId: number;
  @ManyToOne(() => Customer, (customer) => customer.posts, {})
  @JoinColumn({ name: "customerId", referencedColumnName: "id" })
  customer: Customer;

  @OneToMany(() => Media, (media) => media.post, {
    cascade: true,
  })
  medias: Media[];

  @OneToMany(
    () => BreedingTransaction,
    (breedingTransaction) => breedingTransaction.post,
    {},
  )
  breedingTransactions: BreedingTransaction[];

  @OneToMany(
    () => SaleTransaction,
    (saleTransaction) => saleTransaction.post,
    {},
  )
  saleTransactions: SaleTransaction[];

  constructor(partial: Partial<Post>) {
    super();
    Object.assign(this, partial);
  }
}
