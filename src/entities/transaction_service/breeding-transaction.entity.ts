import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Customer } from "../user_management_service/customer.entity";
import { Pet } from "../pet_service/pet.entity";
import { Post } from "./post.entity";
import { Branch } from "../user_management_service/branch.entity";
// import { Promotion } from "../service/promotion.entity";
import { BreedingTransactionEnum } from "src/enum";
import { BaseEntity } from "typeorm";
import { PetCombo } from "../pet_service/pet-combo.entity";

@Entity("breeding_transaction")
export class BreedingTransaction extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
  //date
  @Column({
    type: "timestamp without time zone",
    nullable: false,
  })
  createdTime: Date;
  @Column({
    type: "timestamp without time zone",
    nullable: true,
  })
  meetingTime: Date;
  @Column({
    type: "timestamp without time zone",
    nullable: true,
  })
  dateOfBreeding: Date;
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
  @Column({
    type: "timestamp without time zone",
    nullable: true,
  })
  paymentForMalePetOwnerTime: Date;
  @Column({
    type: "timestamp without time zone",
    nullable: true,
  })
  paymentForBranchTime: Date;
  //fee
  @Column({ type: "int", nullable: false })
  sellerReceive: number;
  @Column({ type: "int", nullable: false })
  serviceFee: number;
  @Column({ type: "int", nullable: true })
  transactionFee: number;
  @Column({ type: "int", nullable: false })
  transactionTotal: number;
  @Column({ type: "int", nullable: true })
  point: number;
  //state
  @Column({ type: "boolean", nullable: true, default: false })
  self: boolean;
  @Column({ type: "enum", enum: BreedingTransactionEnum })
  status: BreedingTransactionEnum;
  //extra
  @Column({
    type: "text",
    nullable: true,
  })
  placeMeeting: string;
  @Column({ type: "text", nullable: true })
  evidence: string;
  @Column({ type: "text", nullable: true })
  description: string;
  @Column({ type: "text", nullable: true })
  paymentMethod: string;
  //review
  @Column({ type: "int", nullable: true })
  star: number;
  @Column({ type: "text", nullable: true })
  review: string;
  @Column({ type: "text", nullable: true })
  reasonCancel: string;

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

  @Column({ name: "breedingBranchId", nullable: true })
  breedingBranchId: number;
  @ManyToOne(() => Branch, (branch) => branch.breedTransactions, {})
  @JoinColumn({ name: "breedingBranchId", referencedColumnName: "id" })
  breedingBranch: Branch;

  @OneToMany(() => PetCombo, (petCombo) => petCombo.breedingTransaction, {})
  petCombos: PetCombo[];

  constructor(partial: Partial<BreedingTransaction>) {
    super();
    Object.assign(this, partial);
  }
}
