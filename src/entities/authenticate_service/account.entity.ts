import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  Length,
  IsDate,
  IsBoolean,
} from "class-validator";
import { GenderEnum } from "src/enum";
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
  @IsEmail()
  email: string;
  @Column({ type: "text", nullable: false })
  @IsString()
  @Length(0, 16)
  firstName: string;
  @Column({ type: "text", nullable: false })
  @IsString()
  @Length(0, 16)
  lastName: string;
  @Column({ type: "text", nullable: false, unique: true })
  @IsPhoneNumber()
  phoneNumber: string;
  @Column({ type: "text", nullable: true })
  @IsString()
  @Length(0, 64)
  address: string;
  @Column({ type: "enum", enum: GenderEnum, default: GenderEnum.MALE })
  gender: GenderEnum;

  @Column({ type: "text", nullable: true })
  avatar: string;
  @Column({
    type: "timestamp without time zone",
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
  })
  registerTime: Date;

  @Column({
    type: "timestamp without time zone",
    nullable: true,
  })
  @IsDate()
  dateOfBirth: Date;

  @Column({ type: "bool", default: true })
  @IsBoolean()
  isActive: boolean;

  @Column({ name: "roleId" })
  roleId: number;

  @ManyToOne(() => Role, (role) => role.accounts, {})
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

// @OneToMany(() => Post, (post) => post.seller)
// posts: Post[];

// @OneToMany(() => Post, (post) => post.staff)
// staffPosts: Post[];
// @OneToMany(() => SaleTransaction, (saleTransaction) => saleTransaction.id)
// saleTransactions: SaleTransaction[];
// @OneToMany(
//   () => BreedingTransaction,
//   (breedingTransaction) => breedingTransaction.id,
// )
// breedingTransactions: BreedingTransaction[];
