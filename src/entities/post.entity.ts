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

@Entity("post")
export class Post {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "text", nullable: false })
  title: string;
  @Column({ type: "float", nullable: false })
  price: Double;
  @Column({ type: "float" })
  deposit: Double;
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
  @Column({ type: "bool", default: true })
  status: boolean;
  @Column({ type: "text", nullable: false })
  evidence: string;
  @Column({ type: "text", nullable: false })
  petImage: string;
  @Column({ type: "text", nullable: true })
  sellerContract: string;

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
}
