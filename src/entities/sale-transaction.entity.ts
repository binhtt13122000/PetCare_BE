import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Account } from "./account.entity";
import { Media } from "./media.entity";
import { Pet } from "./pet.entity";

@Entity("sale_transaction")
export class SaleTransaction {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "text", nullable: false })
  type: string;
  @Column({ type: "integer", nullable: false })
  totalPrice: number;
  @Column({ type: "integer", nullable: false })
  payForSeller: number;
  @Column({ type: "integer", nullable: false })
  deposit: number;
  @Column({ type: "bool", default: true })
  status: boolean;
  @Column({ type: "text", nullable: true })
  description: string;
  @Column({ type: "timestamp without time zone", nullable: true })
  payForSellerTime: Date;
  @Column({ type: "timestamp without time zone", nullable: true })
  payFromBuyerTime: Date;
  @OneToMany(() => Media, (media) => media.id)
  sellerContractImages: Media[];
  @OneToMany(() => Media, (media) => media.id)
  buyerContractImages: Media[];

  @Column({ name: "petId" })
  petId: number;
  @ManyToOne(() => Pet, (pet) => pet.saleTransactions, {})
  @JoinColumn({ name: "petId", referencedColumnName: "id" })
  pet: Pet;

  @Column({ name: "sellerId" })
  sellerId: number;
  @ManyToOne(() => Account, (account) => account.saleTransactions, {})
  @JoinColumn({ name: "sellerId", referencedColumnName: "id" })
  seller: Account;

  @Column({ name: "buyerId" })
  buyerId: number;
  @ManyToOne(() => Account, (account) => account.saleTransactions, {})
  @JoinColumn({ name: "buyerId", referencedColumnName: "id" })
  buyer: Account;
}
