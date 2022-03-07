import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SaleTransaction } from "./sale-transaction.entity";
import { Ticket } from "./ticket.entity";
import { Post } from "./post.entity";
import { Pet } from "./pet.entity";
import { BreedingTransaction } from "./breeding-transaction.entity";

@Entity("media")
export class Media {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "text", nullable: false })
  url: string;
  @Column({ type: "text", nullable: false })
  type: "image" | "video";
  @Column({ type: "bool", default: true })
  status: boolean;
  @ManyToOne(() => Ticket, (ticket) => ticket.medias, {})
  @JoinColumn({ name: "ticketId", referencedColumnName: "id" })
  ticketId: number;

  @ManyToOne(
    () => SaleTransaction,
    (saleTransaction) => saleTransaction.sellerContractImages,
    {},
  )
  @JoinColumn({
    name: "saleTransactionSellerContractId",
    referencedColumnName: "id",
  })
  saleTransactionSellerContractId: number;

  @ManyToOne(
    () => SaleTransaction,
    (saleTransaction) => saleTransaction.buyerContractImages,
    {},
  )
  @JoinColumn({
    name: "saleTransactionBuyerContractId",
    referencedColumnName: "id",
  })
  saleTransactionBuyerContractId: number;

  @ManyToOne(() => Post, (post) => post.sellerContractImages, {})
  @JoinColumn({
    name: "postSellerContractId",
    referencedColumnName: "id",
  })
  postSellerContractId: number;

  @ManyToOne(() => Post, (post) => post.evidences, {})
  @JoinColumn({
    name: "postEvidenceId",
    referencedColumnName: "id",
  })
  postEvidenceId: number;

  @ManyToOne(() => Pet, (pet) => pet.medias, {})
  @JoinColumn({
    name: "petId",
    referencedColumnName: "id",
  })
  petId: number;

  @ManyToOne(
    () => BreedingTransaction,
    (breedingTransaction) => breedingTransaction.sellerBreedingContractImages,
    {},
  )
  @JoinColumn({
    name: "breedingTransactionSellerContractId",
    referencedColumnName: "id",
  })
  breedingTransactionSellerContractId: number;

  @ManyToOne(
    () => BreedingTransaction,
    (breedingTransaction) => breedingTransaction.buyerBreedingContractImages,
    {},
  )
  @JoinColumn({
    name: "breedingTransactionBuyerContractId",
    referencedColumnName: "id",
  })
  breedingTransactionBuyerContractId: number;
}
