import {
  IsNumber,
  Max,
  Min,
  IsInt,
  IsString,
  Length,
  IsEmail,
  IsPhoneNumber,
} from "class-validator";
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  BaseEntity,
} from "typeorm";
import { PetOwner } from "../pet_service/pet-owner.entity";
import { Promotion } from "../service/promotion.entity";
import { Follow } from "./follow.entity";
import { Report } from "./report.entity";
import { Order } from "../order_service/order.entity";
import { Post } from "../transaction_service/post.entity";
import { SaleTransaction } from "../transaction_service/sale-transaction.entity";
import { BreedingTransaction } from "../transaction_service/breeding-transaction.entity";
import { GenderEnum } from "src/enum";

@Entity("customer")
export class Customer extends BaseEntity {
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
  point: number;
  @Column({ type: "int", nullable: true, default: 0 })
  @Min(0)
  @IsInt()
  numberFollowers: number;
  @Column({ type: "int", nullable: true, default: 0 })
  @Min(0)
  @IsInt()
  numberReviewers: number;
  @Column({ type: "text", nullable: true })
  @IsString()
  @Length(0, 8)
  bankName: string;
  @Column({ type: "text", nullable: true })
  @IsString()
  @Length(0, 32)
  bankCode: string;
  @Column({ type: "text", nullable: true })
  @IsString()
  @Length(0, 64)
  bankBranch: string;

  @Column({ type: "int", nullable: false })
  accountId: number;

  // Reference
  @OneToMany(() => Follow, (follow) => follow.follower)
  followers: Follow[];

  @OneToMany(() => Follow, (follow) => follow.followed)
  followeds: Follow[];

  @OneToMany(() => Report, (report) => report.reporter)
  reporters: Report[];

  @OneToMany(() => Report, (report) => report.reportedUser)
  reporteds: Report[];

  @OneToMany(() => PetOwner, (petOwner) => petOwner.customer)
  petOwners: PetOwner[];

  @OneToMany(() => Promotion, (promotion) => promotion.customer)
  promotions: Promotion[];

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];

  @OneToMany(() => Post, (post) => post.customer)
  posts: Post[];

  @OneToMany(() => SaleTransaction, (saleTransaction) => saleTransaction.buyer)
  buyerSaleTransactions: SaleTransaction[];

  @OneToMany(() => SaleTransaction, (saleTransaction) => saleTransaction.seller)
  sellerSaleTransactions: SaleTransaction[];

  @OneToMany(
    () => BreedingTransaction,
    (breedingTransaction) => breedingTransaction.ownerPetMale,
  )
  ownerPetMales: BreedingTransaction[];

  @OneToMany(
    () => BreedingTransaction,
    (breedingTransaction) => breedingTransaction.ownerPetFemale,
  )
  ownerPetFemales: BreedingTransaction[];

  constructor(partial: Partial<Customer>) {
    super();
    Object.assign(this, partial);
  }
}
