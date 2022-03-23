import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BreedingTransaction } from "./breeding-transaction.entity";
import { Category } from "./category.entity";
import { HealthRecord } from "./health-record.entity";
import { Paper } from "./paper.entity";
import { PetOwner } from "./pet-owner.entity";
import { Post } from "./post.entity";
import { SaleTransaction } from "./sale-transaction.entity";
import { Vaccine } from "./vaccine.entity";
import { BaseEntity } from "typeorm";
import { GenderEnum, PetEnum } from "../enum/index";

@Entity("pet")
export class Pet extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "text", nullable: false })
  name: string;
  @Column({ type: "date", nullable: false })
  dob: Date;
  @Column({ type: "integer", nullable: true })
  ageRange: number;
  @Column({ type: "enum", enum: GenderEnum })
  gender: GenderEnum;
  @Column({ type: "text", nullable: true })
  description: string;
  @Column({ type: "text", nullable: false })
  avatar: string;
  @Column({ type: "bool", default: true })
  isSeed: boolean;
  @Column({ type: "enum", enum: PetEnum })
  status: PetEnum;
  @Column({ type: "text", nullable: true })
  color: string;
  @Column({ type: "text", nullable: true })
  bloodGroup: string;

  @Column({ name: "categoryId" })
  categoryId: number;
  @ManyToOne(() => Category, (category) => category.pets, {})
  @JoinColumn({ name: "categoryId", referencedColumnName: "id" })
  category: Category;

  @OneToMany(() => Paper, (paper) => paper.id)
  papers: Paper[];
  @OneToMany(() => Vaccine, (vaccine) => vaccine.id)
  vaccines: Vaccine[];
  @OneToMany(() => SaleTransaction, (saleTransaction) => saleTransaction.id)
  saleTransactions: SaleTransaction[];
  @OneToMany(() => Post, (post) => post.id)
  posts: Post[];
  @OneToMany(() => HealthRecord, (healthRecord) => healthRecord.id)
  healthRecords: HealthRecord[];
  @OneToMany(() => PetOwner, (petOwner) => petOwner.pet, {
    cascade: true,
  })
  petOwners: PetOwner[];
  @OneToMany(
    () => BreedingTransaction,
    (breedingTransaction) => breedingTransaction.id,
  )
  breedingTransactions: BreedingTransaction[];

  constructor(partial: Partial<Pet>) {
    super();
    Object.assign(this, partial);
  }
}
