import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { IsDate, IsInt, Min, Max, IsString } from "class-validator";
import { Customer } from "../user_management_service/customer.entity";
import { Pet } from "../pet_service/pet.entity";
import { Post } from "./post.entity";
import { Branch } from "../user_management_service/branch.entity";
import { Promotion } from "../service/promotion.entity";
import { BreedingTransactionEnum } from "src/enum";

@Entity("breeding_transaction")
export class BreedingTransaction {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({
    type: "timestamp without time zone",
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
  })
  @IsDate()
  createdTime: Date;
  @Column({
    type: "timestamp without time zone",
    nullable: false,
  })
  @IsDate()
  meetingTime: Date;
  @Column({
    type: "timestamp without time zone",
    nullable: false,
  })
  @IsDate()
  dateOfBreeding: Date;
  @Column({ type: "int", nullable: false })
  @IsInt()
  @Min(0)
  sellerReceive: number;
  @Column({ type: "int", nullable: false })
  @IsInt()
  @Min(0)
  serviceFee: number;
  @Column({ type: "int", nullable: false })
  @IsInt()
  @Min(0)
  provisionalTotal: number;
  @Column({ type: "int", nullable: false })
  @IsInt()
  @Min(0)
  discount: number;
  @Column({ type: "int", nullable: false })
  @IsInt()
  @Min(0)
  transactionTotal: number;
  @Column({
    type: "timestamp without time zone",
    nullable: false,
  })
  @IsDate()
  pickupMalePetTime: Date;
  @Column({
    type: "timestamp without time zone",
    nullable: false,
  })
  @IsDate()
  pickupFemalePetTime: Date;
  @Column({ type: "text", nullable: true })
  evidence: string;
  @Column({ type: "text", nullable: true })
  description: string;
  @Column({ type: "text", nullable: false })
  paymentMethod: string;
  @Column({ type: "int", nullable: false })
  @IsInt()
  @Min(0)
  @Max(5)
  star: number;
  @Column({ type: "text", nullable: true })
  @IsString()
  review: string;
  @Column({ type: "text", nullable: true })
  @IsString()
  reasonCancel: string;
  @Column({ type: "enum", enum: BreedingTransactionEnum })
  status: BreedingTransactionEnum;

  //references
  @Column({ name: "ownerPetMaleId" })
  ownerPetMaleId: number;
  @ManyToOne(() => Customer, (customer) => customer.ownerPetMales, {})
  @JoinColumn({ name: "ownerPetMaleId", referencedColumnName: "id" })
  ownerPetMale: Customer;

  @Column({ name: "ownerPetFemaleId" })
  ownerPetFemaleId: number;
  @ManyToOne(() => Customer, (customer) => customer.ownerPetFemales, {})
  @JoinColumn({ name: "ownerPetFemaleId", referencedColumnName: "id" })
  ownerPetFemale: Customer;

  @Column({ name: "petMaleId" })
  petMaleId: number;
  @ManyToOne(() => Pet, (pet) => pet.maleBreedingTransactions, {})
  @JoinColumn({ name: "petMaleId", referencedColumnName: "id" })
  petMale: Pet;

  @Column({ name: "petFemaleId" })
  petFemaleId: number;
  @ManyToOne(() => Pet, (pet) => pet.femaleBreedingTransactions, {})
  @JoinColumn({ name: "petFemaleId", referencedColumnName: "id" })
  petFemale: Pet;

  @Column({ name: "postId" })
  postId: number;
  @ManyToOne(() => Post, (post) => post.breedingTransactions, {})
  @JoinColumn({ name: "postId", referencedColumnName: "id" })
  post: Post;

  @Column({ name: "branchId" })
  branchId: number;
  @ManyToOne(() => Branch, (branch) => branch.breedingTransactions, {})
  @JoinColumn({ name: "branchId", referencedColumnName: "id" })
  branch: Branch;

  @Column({ name: "promotionId", nullable: true })
  promotionId: number;
  @ManyToOne(() => Promotion, (promotion) => promotion.breedingTransactions, {})
  @JoinColumn({ name: "promotionId", referencedColumnName: "id" })
  promotion: Promotion;
}
