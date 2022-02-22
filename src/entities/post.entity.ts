import {
  Column,
  Double,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Account } from "./account.entity";
import { Pet } from "./pet.entity";

export class Post {
  @PrimaryGeneratedColumn("increment")
  postId: number;
  @Column({ type: "text", nullable: false })
  title: string;
  @Column({ type: "float", nullable: false })
  price: Double;
  @Column({ type: "float" })
  deposit: Double;
  @Column({ type: "timestamp with time zone", nullable: false })
  createTime: Date;
  @Column({ type: "timestamp with time zone", nullable: false })
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
  @ManyToOne(() => Pet, (pet) => pet.posts, {})
  @JoinColumn({ name: "petId", referencedColumnName: "petId" })
  petId: number;
  @ManyToOne(() => Account, (account) => account.posts, {})
  @JoinColumn({ name: "staffId", referencedColumnName: "accountId" })
  staffId: number;
  @ManyToOne(() => Account, (account) => account.posts, {})
  @JoinColumn({ name: "sellerId", referencedColumnName: "accountId" })
  sellerId: number;
}
