import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Account } from "./account.entity";
import { Media } from "./media.entity";
import { Pet } from "./pet.entity";

@Entity("breeding_transaction")
export class BreedingTransaction {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "integer", nullable: false })
  totalPrice: number;
  @Column({ type: "bool", default: false })
  status: boolean;
  @Column({ type: "text", nullable: true })
  breedingContract: string;
  @Column({ type: "date", nullable: true })
  dateOfBreeding: Date;
  @Column({ type: "integer", nullable: true })
  deposit: number;
  @Column({ type: "bool", default: false })
  statusAfterUltrasound: boolean;
  @Column({ type: "text", nullable: true })
  evidenceBreeding: string;
  @Column({ type: "text", nullable: true })
  evidenceAfterUltrasound: string;
  @Column({ type: "date", nullable: true })
  dateOfUltrasound: Date;
  @OneToMany(() => Media, (media) => media.id)
  sellerBreedingContractImages: Media[];
  @OneToMany(() => Media, (media) => media.id)
  buyerBreedingContractImages: Media[];

  @Column({ name: "petMaleId" })
  petMaleId: number;
  @ManyToOne(() => Pet, (pet) => pet.breedingTransactions, {})
  @JoinColumn({ name: "petMaleId", referencedColumnName: "id" })
  petMale: Pet;

  @Column({ name: "petFemaleId" })
  petFemaleId: number;
  @ManyToOne(() => Pet, (pet) => pet.breedingTransactions, {})
  @JoinColumn({ name: "petFemaleId", referencedColumnName: "id" })
  petFemale: Pet;

  @Column({ name: "ownerMaleId" })
  ownerMaleId: number;
  @ManyToOne(() => Account, (account) => account.breedingTransactions, {})
  @JoinColumn({ name: "ownerMaleId", referencedColumnName: "id" })
  ownerMale: Account;

  @Column({ name: "ownerFemaleId" })
  ownerFemaleId: number;
  @ManyToOne(() => Account, (account) => account.breedingTransactions, {})
  @JoinColumn({ name: "ownerFemaleId", referencedColumnName: "id" })
  ownerFemale: Account;
}
