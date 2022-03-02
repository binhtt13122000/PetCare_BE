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

@Entity("pet")
export class Pet {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "text", nullable: false })
  name: string;
  @Column({ type: "date", nullable: false })
  dob: Date;
  @Column({ type: "integer", nullable: true })
  ageRange: number;
  @Column({ type: "bool", default: true })
  isMale: boolean;
  @Column({ type: "text", nullable: true })
  description: string;
  @Column({ type: "text", nullable: false })
  avatar: string;
  @Column({ type: "bool", default: true })
  isSeed: boolean;
  @Column({ type: "bool", default: true })
  status: boolean;
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
  papers: [];
  @OneToMany(() => Vaccine, (vaccine) => vaccine.id)
  vaccines: [];
  @OneToMany(() => SaleTransaction, (saleTransaction) => saleTransaction.id)
  saleTransactions: [];
  @OneToMany(() => Post, (post) => post.id)
  posts: [];
  @OneToMany(() => HealthRecord, (healthRecord) => healthRecord.id)
  healthRecords: [];
  @OneToMany(() => PetOwner, (petOwner) => petOwner.id)
  petOwners: [];
  @OneToMany(
    () => BreedingTransaction,
    (breedingTransaction) => breedingTransaction.id,
  )
  breedingTransactions: [];
}
