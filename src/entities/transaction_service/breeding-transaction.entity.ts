import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Customer } from "../user_management_service/customer.entity";
import { Pet } from "../pet_service/pet.entity";
import { Post } from "./post.entity";
import { Branch } from "../user_management_service/branch.entity";
// import { Promotion } from "../service/promotion.entity";
import { BreedingTransactionEnum } from "src/enum";
import { BaseEntity } from "typeorm";

@Entity("breeding_transaction")
export class BreedingTransaction extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({
    type: "timestamp without time zone",
    nullable: false,
  })
  createdTime: Date;
  @Column({
    type: "timestamp without time zone",
    nullable: false,
  })
  meetingTime: Date;
  @Column({
    type: "timestamp without time zone",
    nullable: true,
  })
  dateOfBreeding: Date;
  @Column({ type: "int", nullable: false })
  sellerReceive: number;
  @Column({ type: "int", nullable: false })
  serviceFee: number;
  @Column({ type: "int", nullable: false })
  transactionTotal: number;
  @Column({ type: "int", nullable: true })
  point: number;
  @Column({
    type: "timestamp without time zone",
    nullable: true,
  })
  pickupMalePetTime: Date;
  @Column({
    type: "timestamp without time zone",
    nullable: true,
  })
  pickupFemalePetTime: Date;
  @Column({
    type: "timestamp without time zone",
    nullable: true,
  })
  cancelTime: Date;
  @Column({ type: "text", nullable: true })
  evidence: string;
  @Column({ type: "text", nullable: true })
  description: string;
  @Column({ type: "text", nullable: true })
  paymentMethod: string;
  @Column({ type: "int", nullable: true })
  star: number;
  @Column({ type: "text", nullable: true })
  review: string;
  @Column({ type: "text", nullable: true })
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

  constructor(partial: Partial<BreedingTransaction>) {
    super();
    Object.assign(this, partial);
  }
}
