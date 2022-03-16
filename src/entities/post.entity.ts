import {
  BaseEntity,
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
import { PostEnum } from "../enum/index";
import { BreedingTransaction } from "./breeding-transaction.entity";
import { SaleTransaction } from "./sale-transaction.entity";

@Entity("post")
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "text", nullable: false })
  title: string;
  @Column({ type: "integer", nullable: false })
  price: number;
  @Column({ type: "integer" })
  deposit: number;
  @Column({ type: "integer" })
  refund: number;
  @Column({
    type: "timestamp without time zone",
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
  })
  createTime: Date;
  @Column({ type: "timestamp without time zone", nullable: false })
  effectiveTime: Date;
  @Column({ type: "text", nullable: false })
  type: string;
  @Column({ type: "text", nullable: true })
  description: string;
  @Column({ type: "enum", enum: PostEnum })
  status: PostEnum;
  @OneToMany(() => Media, (media) => media.id, {
    cascade: true,
  })
  sellerContractImages: Media[];
  @Column({ type: "text", nullable: true })
  reasonCancel: string;

  @OneToMany(() => Media, (media) => media.id, {
    cascade: true,
  })
  evidences: Media[];

  @Column({ name: "petId" })
  petId: number;
  @ManyToOne(() => Pet, (pet) => pet.posts, {})
  @JoinColumn({ name: "petId", referencedColumnName: "id" })
  pet: Pet;

  @Column({ name: "staffId" })
  staffId: number;
  @ManyToOne(() => Account, (account) => account.posts, {})
  @JoinColumn({ name: "staffId", referencedColumnName: "id" })
  staff: Account;

  @Column({ name: "sellerId" })
  sellerId: number;
  @ManyToOne(() => Account, (account) => account.posts, {})
  @JoinColumn({ name: "sellerId", referencedColumnName: "id" })
  seller: Account;

  @OneToMany(() => Post, (post) => post.id, {})
  breedingTransactions: BreedingTransaction[];

  @OneToMany(() => Post, (post) => post.id, {})
  saleTransactions: SaleTransaction[];

  constructor(partial: Partial<Post>) {
    super();
    Object.assign(this, partial);
  }
}
