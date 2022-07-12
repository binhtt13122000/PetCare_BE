import { IsPhoneNumber, IsString, IsEmail, IsBoolean } from "class-validator";
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
import { HealthPetRecord } from "src/entities/pet_service/health-pet-record.entity";
import { Ticket } from "../service/ticket.entity";
import { Promotion } from "../service/promotion.entity";

import { PetCombo } from "../pet_service/pet-combo.entity";
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
  @Column({ type: "bool", default: true })
  @IsBoolean()
  isActive: boolean;

  @OneToMany(() => Promotion, (promotion) => promotion.branch)
  promotions: Promotion[];

  @OneToMany(() => Order, (order) => order.branch)
  orders: Order[];

  @OneToMany(() => Post, (post) => post.branch)
  posts: Post[];

  @OneToMany(() => Ticket, (ticket) => ticket.branch)
  tickets: Ticket[];

  @OneToMany(
    () => HealthPetRecord,
    (vaccinePetRecord) => vaccinePetRecord.branch,
  )
  healthPetRecords: HealthPetRecord[];

  @OneToMany(
    () => BreedingTransaction,
    (breedingTransaction) => breedingTransaction.breedingBranch,
  )
  breedTransactions: BreedingTransaction[];

  @OneToMany(() => PetCombo, (petCombo) => petCombo.branch, {})
  petCombos: PetCombo[];

  constructor(partial: Partial<Branch>) {
    super();
    Object.assign(this, partial);
  }
}
