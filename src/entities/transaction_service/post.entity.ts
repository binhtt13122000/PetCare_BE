import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Media } from "./media.entity";
import { Pet } from "../pet_service/pet.entity";
import { PostEnum, ServiceEnum } from "../../enum/index";
import { BreedingTransaction } from "./breeding-transaction.entity";
import { SaleTransaction } from "./sale-transaction.entity";
import { IsDate, IsInt } from "class-validator";
import { Staff } from "../user_management_service/staff.entity";
import { Customer } from "../user_management_service/customer.entity";

@Entity("post")
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "text", nullable: false })
  title: string;
  @Column({ type: "integer", nullable: false })
  @IsInt()
  sellerReceive: number;
  @Column({ type: "integer", nullable: false })
  @IsInt()
  shopFee: number;
  @Column({ type: "integer", nullable: false })
  @IsInt()
  provisionalTotal: number;
  @Column({
    type: "timestamp without time zone",
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
  })
  @IsDate()
  createTime: Date;
  @Column({ type: "timestamp without time zone", nullable: true })
  @IsDate()
  meetingTime: Date;
  @Column({
    type: "timestamp without time zone",
    nullable: true,
  })
  @IsDate()
  approveTime: Date;
  @Column({
    type: "timestamp without time zone",
    nullable: true,
  })
  @IsDate()
  cancelTime: Date;
  @Column({
    type: "timestamp without time zone",
    nullable: true,
  })
  @IsDate()
  rejectTime: Date;
  @Column({ type: "enum", enum: ServiceEnum })
  type: ServiceEnum;
  @Column({ type: "text", nullable: true })
  description: string;
  @Column({ type: "enum", enum: PostEnum })
  status: PostEnum;
  @Column({ type: "text", nullable: true })
  reasonCancel: string;
  @Column({ type: "text", nullable: true })
  reasonReject: string;
  @Column({ type: "bool", default: false })
  isVaccineInject: boolean;

  //references
  @Column({ name: "petId" })
  petId: number;
  @ManyToOne(() => Pet, (pet) => pet.posts, {})
  @JoinColumn({ name: "petId", referencedColumnName: "id" })
  pet: Pet;

  @Column({ name: "staffId", nullable: true })
  staffId: number;
  @ManyToOne(() => Staff, (staff) => staff.posts, {})
  @JoinColumn({ name: "staffId", referencedColumnName: "id" })
  staff: Staff;

  @Column({ name: "customerId" })
  customerId: number;
  @ManyToOne(() => Customer, (customer) => customer.posts, {})
  @JoinColumn({ name: "customerId", referencedColumnName: "id" })
  customer: Customer;

  @OneToMany(() => Media, (media) => media.post, {
    cascade: true,
  })
  medias: Media[];

  @OneToMany(
    () => BreedingTransaction,
    (breedingTransaction) => breedingTransaction.post,
    {},
  )
  breedingTransactions: BreedingTransaction[];

  @OneToMany(
    () => SaleTransaction,
    (saleTransaction) => saleTransaction.post,
    {},
  )
  saleTransactions: SaleTransaction[];

  constructor(partial: Partial<Post>) {
    super();
    Object.assign(this, partial);
  }
}
