import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IsString, Max, Min } from "class-validator";
import { Customer } from "../user_management_service/customer.entity";
import { Pet } from "../pet_service/pet.entity";
import { Post } from "./post.entity";
import { BaseEntity } from "typeorm";
import { SaleTransactionEnum } from "src/enum";

@Entity("sale_transaction")
export class SaleTransaction extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({
    type: "timestamp without time zone",
    nullable: false,
  })
  createdTime: Date;
  @Column({
    type: "timestamp without time zone",
    nullable: false,
  })
  meetingTime: Date;
  @Column({ type: "text", nullable: false })
  placeMeeting: string;
  @Column({
    type: "timestamp without time zone",
    nullable: true,
  })
  transactionTime: Date;
  @Column({
    type: "timestamp without time zone",
    nullable: true,
  })
  cancelTime: Date;
  @Column({ type: "int", nullable: true })
  point: number;
  @Column({ type: "int", nullable: true })
  @Min(0)
  @Max(5)
  star: number;
  @Column({ type: "text", nullable: true })
  @IsString()
  review: string;
  @Column({ type: "text", nullable: true })
  @IsString()
  reasonCancel: string;
  @Column({ type: "enum", enum: SaleTransactionEnum })
  status: SaleTransactionEnum;

  //references
  @Column({ name: "buyerId" })
  buyerId: number;
  @ManyToOne(() => Customer, (customer) => customer.buyerSaleTransactions, {})
  @JoinColumn({ name: "buyerId", referencedColumnName: "id" })
  buyer: Customer;
  @Column({ name: "sellerId" })
  sellerId: number;
  @ManyToOne(() => Customer, (customer) => customer.sellerSaleTransactions, {})
  @JoinColumn({ name: "sellerId", referencedColumnName: "id" })
  seller: Customer;
  @Column({ name: "petId" })
  petId: number;
  @ManyToOne(() => Pet, (pet) => pet.saleTransactions, {})
  @JoinColumn({ name: "petId", referencedColumnName: "id" })
  pet: Pet;
  @Column({ name: "postId" })
  postId: number;
  @ManyToOne(() => Post, (post) => post.saleTransactions, {})
  @JoinColumn({ name: "postId", referencedColumnName: "id" })
  post: Post;

  constructor(partial: Partial<SaleTransaction>) {
    super();
    Object.assign(this, partial);
  }
}
