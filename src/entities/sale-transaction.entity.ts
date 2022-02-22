import {
  Column,
  Double,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Account } from "./account.entity";
import { Pet } from "./pet.entity";

export class SaleTransaction {
  @PrimaryGeneratedColumn("increment")
  saleTransactionId: number;
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
  @Column({ type: "timestamp with time zone", nullable: true })
  payForSellerTime: Date;
  @Column({ type: "timestamp with time zone", nullable: true })
  payFromBuyerTime: Date;
  @ManyToOne(() => Pet, (pet) => pet.saleTransactions, {})
  @JoinColumn({ name: "petId", referencedColumnName: "petId" })
  petId: number;
  @ManyToOne(() => Account, (account) => account.saleTransactions, {})
  @JoinColumn({ name: "sellerId", referencedColumnName: "accountId" })
  sellerId: number;
  @ManyToOne(() => Account, (account) => account.saleTransactions, {})
  @JoinColumn({ name: "buyerId", referencedColumnName: "accountId" })
  buyerId: number;
}
