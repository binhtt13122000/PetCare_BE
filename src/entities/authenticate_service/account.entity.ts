import { IsPhoneNumber, IsString, IsBoolean } from "class-validator";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Role } from "./role.entity";

@Entity("account")
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "text", nullable: true })
  @IsString()
  password: string;
  @Column({ type: "text", nullable: false, unique: true })
  @IsPhoneNumber()
  phoneNumber: string;
  @Column({
    type: "timestamp without time zone",
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
  })
  registerTime: Date;

  @Column({ type: "bool", default: true })
  @IsBoolean()
  isActive: boolean;

  @Column({ name: "roleId" })
  roleId: number;

  @ManyToOne(() => Role, (role) => role.accounts, {
    cascade: true,
  })
  @JoinColumn({ name: "roleId", referencedColumnName: "id" })
  role: Role;

  @Column({
    nullable: true,
    type: "text",
  })
  currentHashedRefreshToken?: string;

  constructor(partial: Partial<Account>) {
    super();
    Object.assign(this, partial);
  }
}
