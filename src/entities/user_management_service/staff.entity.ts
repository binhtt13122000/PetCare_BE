import {
  IsNumber,
  Max,
  Min,
  IsInt,
  Length,
  IsPhoneNumber,
  IsString,
  IsEmail,
} from "class-validator";
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  BaseEntity,
} from "typeorm";
import { Order } from "../order_service/order.entity";
import { Post } from "../transaction_service/post.entity";
import { BreedingTransaction } from "../transaction_service/breeding-transaction.entity";
import { GenderEnum } from "src/enum";

@Entity("staff")
export class Staff extends BaseEntity {
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
  @Column({ type: "float", nullable: false, default: 0 })
  @Min(0)
  @Max(5)
  @IsNumber()
  star: number;
  @Column({ type: "int", nullable: true, default: 0 })
  @Min(0)
  @IsInt()
  numberReviewers: number;

  @Column({ type: "int", nullable: false })
  accountId: number;

  @OneToMany(() => Order, (order) => order.staff)
  orders: Order[];

  @OneToMany(() => Post, (post) => post.staff)
  posts: Post[];

  @OneToMany(
    () => BreedingTransaction,
    (breedingTransaction) => breedingTransaction.staff,
  )
  breedingTransactions: BreedingTransaction[];

  constructor(partial: Partial<Staff>) {
    super();
    Object.assign(this, partial);
  }
}
