import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Account } from "./account.entity";

@Entity("promotion")
export class Promotion {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "text", nullable: false })
  name: string;
  @Column({ type: "integer", nullable: false })
  promo: number;
  @Column({ type: "date", nullable: false })
  startTime: Date;
  @Column({ type: "date", nullable: false })
  expireTime: Date;
  @Column({ type: "text", nullable: true })
  description: string;
  @Column({ type: "bool", nullable: false, default: true })
  status: boolean;

  @Column({ name: "accountId", nullable: true })
  accountId: number;
  @ManyToOne(() => Account, (account) => account.promotions, {})
  @JoinColumn({ name: "accountId", referencedColumnName: "id" })
  account: Account;
}
