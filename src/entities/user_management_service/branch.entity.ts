import {
  IsNumber,
  Max,
  Min,
  IsPhoneNumber,
  IsString,
  IsEmail,
  IsBoolean,
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
import { HealthRecord } from "../health_service/health-record.entity";
import { VaccinePetRecord } from "src/entities/pet_service/vaccine-pet-record.entity";
import { Ticket } from "../service/ticket.entity";
import { Promotion } from "../service/promotion.entity";

import { Type } from "class-transformer";
import { SaleTransaction } from "../transaction_service/sale-transaction.entity";
@Entity("branch")
export class Branch extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "text", nullable: true })
  @IsEmail()
  email: string;
  @Column({ type: "text", nullable: false })
  @IsString()
  representativeName: string;
  @Column({ type: "text", nullable: false, unique: true })
  @IsString()
  name: string;
  @Column({ type: "text", nullable: false, unique: true })
  @IsPhoneNumber()
  phoneNumber: string;
  @Column({ type: "text", nullable: true })
  @IsString()
  address: string;
  @Column({ type: "float", nullable: true })
  lat: number;
  @Column({ type: "float", nullable: true })
  lng: number;
  @Column({ type: "text", nullable: true })
  image: string;
  @Column({ type: "text", nullable: true })
  description: string;
  @Column({ type: "float", nullable: false, default: 0 })
  @Min(0)
  @Max(5)
  @IsNumber()
  @Type(() => Number)
  star: number;
  @Column({ type: "int", nullable: true, default: 0 })
  @Min(0)
  @Type(() => Number)
  numberReviewers: number;
  @Column({ type: "bool", default: true })
  @IsBoolean()
  isActive: boolean;

  @OneToMany(() => Promotion, (promotion) => promotion.branch)
  promotions: Promotion[];

  @OneToMany(() => Order, (order) => order.branch)
  orders: Order[];

  @OneToMany(() => Post, (post) => post.branch)
  posts: Post[];

  @OneToMany(() => HealthRecord, (healthRecord) => healthRecord.branch)
  healthRecords: HealthRecord[];

  @OneToMany(() => Ticket, (ticket) => ticket.branch)
  tickets: Ticket[];

  @OneToMany(
    () => VaccinePetRecord,
    (vaccinePetRecord) => vaccinePetRecord.branch,
  )
  vaccinePetRecords: VaccinePetRecord[];

  @OneToMany(
    () => BreedingTransaction,
    (breedingTransaction) => breedingTransaction.branch,
  )
  breedingTransactions: BreedingTransaction[];

  @OneToMany(
    () => BreedingTransaction,
    (breedingTransaction) => breedingTransaction.breedingBranch,
  )
  breedTransactions: BreedingTransaction[];

  @OneToMany(() => SaleTransaction, (saleTransaction) => saleTransaction.branch)
  saleTransactions: SaleTransaction[];

  constructor(partial: Partial<Branch>) {
    super();
    Object.assign(this, partial);
  }
}
