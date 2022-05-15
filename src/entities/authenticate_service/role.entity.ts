import { IsString } from "class-validator";
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  BaseEntity,
} from "typeorm";
import { Account } from "./account.entity";

@Entity("role")
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "text", nullable: false })
  @IsString()
  name: string;
  @OneToMany(() => Account, (account) => account.role)
  accounts: Account[];
}
