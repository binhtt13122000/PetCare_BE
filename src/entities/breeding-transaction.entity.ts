import {
  Column,
  Double,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Account } from "./account.entity";
import { Pet } from "./pet.entity";

export class BreedingTransaction {
  @PrimaryGeneratedColumn("increment")
  breedingTransactionId: number;
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
  @JoinColumn({ name: "petMaleId", referencedColumnName: "petId" })
  petMaleId: number;
  @ManyToOne(() => Pet, (pet) => pet.breedingTransactions, {})
  @JoinColumn({ name: "petFemaleId", referencedColumnName: "petId" })
  petFemaleId: number;
  @ManyToOne(() => Account, (account) => account.breedingTransactions, {})
  @JoinColumn({ name: "ownerMaleId", referencedColumnName: "accountId" })
  ownerMaleId: number;
  @ManyToOne(() => Account, (account) => account.breedingTransactions, {})
  @JoinColumn({ name: "ownerFemaleId", referencedColumnName: "accountId" })
  ownerFemaleId: number;
}
