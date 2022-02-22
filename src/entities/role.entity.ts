import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Account } from "./account.entity";

export class Role {
  @PrimaryGeneratedColumn("increment")
  roleId: number;
  @Column({ type: "text", nullable: false })
  name: string;
  @OneToMany(() => Account, (account) => account.accountId)
  accounts: [];
}
