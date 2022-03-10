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
import { BreedingTransaction } from "./breeding-transaction.entity";
import { BaseEntity } from "typeorm";

@Entity("media")
export class Media extends BaseEntity {
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

  constructor(partial: Partial<Media>) {
    super();
    Object.assign(this, partial);
  }
}
