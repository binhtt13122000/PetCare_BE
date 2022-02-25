import {
  Column,
  Double,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Account } from "./account.entity";
import { Pet } from "./pet.entity";

@Entity("breeding_transaction")
export class BreedingTransaction {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "float", nullable: false })
  totalPrice: number;
  @Column({ type: "bool", default: false })
  status: boolean;
  @Column({ type: "text", nullable: true })
  breedingContract: string;
  @Column({ type: "date", nullable: true })
  dateOfBreeding: Date;
  @Column({ type: "float", nullable: true })
  deposit: Double;
  @Column({ type: "bool", default: false })
  statusAfterUltrasound: boolean;
  @Column({ type: "text", nullable: true })
  evidenceBreeding: string;
  @Column({ type: "text", nullable: true })
  evidenceAfterUltrasound: string;
  @Column({ type: "date", nullable: true })
  dateOfUltrasound: Date;
  @ManyToOne(() => Pet, (pet) => pet.breedingTransactions, {})
  @JoinColumn({ name: "petMaleId", referencedColumnName: "id" })
  petMaleId: number;
  @ManyToOne(() => Pet, (pet) => pet.breedingTransactions, {})
  @JoinColumn({ name: "petFemaleId", referencedColumnName: "id" })
  petFemaleId: number;
  @ManyToOne(() => Account, (account) => account.breedingTransactions, {})
  @JoinColumn({ name: "ownerMaleId", referencedColumnName: "id" })
  ownerMaleId: number;
  @ManyToOne(() => Account, (account) => account.breedingTransactions, {})
  @JoinColumn({ name: "ownerFemaleId", referencedColumnName: "id" })
  ownerFemaleId: number;
}
