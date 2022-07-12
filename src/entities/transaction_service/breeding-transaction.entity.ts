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
import { OrderDetail } from "../order_service/order-detail.entity";

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
  dateOfFinish: Date;
  @Column({
    type: "timestamp without time zone",
    nullable: true,
  })
  timeToCheckBreeding: Date;
  @Column({
    type: "timestamp without time zone",
    nullable: true,
  })
  pickupMalePetTime: Date;
  @Column({
    type: "timestamp without time zone",
    nullable: true,
  })
  cancelTime: Date;
  @Column({
    type: "timestamp without time zone",
    nullable: true,
  })
  paymentTime: Date;
  //fee
  @Column({ type: "int", nullable: true })
  serviceFee: number;
  @Column({ type: "int", nullable: true })
  point: number;
  @Column({ type: "bool", nullable: true })
  isSuccess: boolean;
  //state
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

  @Column({ name: "postId", nullable: true })
  postId: number;
  @ManyToOne(() => Post, (post) => post.breedingTransactions, {})
  @JoinColumn({ name: "postId", referencedColumnName: "id" })
  post: Post;

  @Column({ name: "breedingBranchId", nullable: true })
  breedingBranchId: number;
  @ManyToOne(() => Branch, (branch) => branch.breedTransactions, {})
  @JoinColumn({ name: "breedingBranchId", referencedColumnName: "id" })
  breedingBranch: Branch;

  @OneToMany(() => PetCombo, (petCombo) => petCombo.breedingTransaction, {})
  petCombos: PetCombo[];

  @OneToMany(
    () => OrderDetail,
    (orderDetail) => orderDetail.breedTransaction,
    {},
  )
  orderDetails: OrderDetail[];

  constructor(partial: Partial<BreedingTransaction>) {
    super();
    Object.assign(this, partial);
  }
}
