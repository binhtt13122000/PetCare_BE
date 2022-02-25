import {
  Column,
  Double,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Account } from "./account.entity";
import { Pet } from "./pet.entity";

@Entity("sale_transaction")
export class SaleTransaction {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "text", nullable: true })
  sellerContract: string;
  @Column({ type: "text", nullable: true })
  buyerContract: string;
  @Column({ type: "text", nullable: false })
  type: string;
  @Column({ type: "float", nullable: false })
  totalPrice: Double;
  @Column({ type: "float", nullable: false })
  payForSeller: Double;
  @Column({ type: "float", nullable: false })
  deposit: Double;
  @Column({ type: "bool", default: true })
  status: boolean;
  @Column({ type: "text", nullable: true })
  description: string;
  @Column({ type: "timestamp without time zone", nullable: true })
  payForSellerTime: Date;
  @Column({ type: "timestamp without time zone", nullable: true })
  payFromBuyerTime: Date;
  @ManyToOne(() => Pet, (pet) => pet.saleTransactions, {})
  @JoinColumn({ name: "petId", referencedColumnName: "id" })
  petId: number;
  @ManyToOne(() => Account, (account) => account.saleTransactions, {})
  @JoinColumn({ name: "sellerId", referencedColumnName: "id" })
  sellerId: number;
  @ManyToOne(() => Account, (account) => account.saleTransactions, {})
  @JoinColumn({ name: "buyerId", referencedColumnName: "id" })
  buyerId: number;
}
