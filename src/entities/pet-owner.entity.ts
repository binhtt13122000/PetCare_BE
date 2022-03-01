import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Account } from "./account.entity";
import { Pet } from "./pet.entity";

@Entity("pet_owner")
export class PetOwner {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "bool", default: true })
  isCurrentOwner: boolean;
  @Column({ type: "date", nullable: false })
  date: Date;

  @Column({ name: "petId" })
  petId: number;
  @ManyToOne(() => Pet, (pet) => pet.petOwners, {})
  @JoinColumn({ name: "petId", referencedColumnName: "id" })
  pet: Pet;

  @Column({ name: "accountId" })
  accountId: number;
  @ManyToOne(() => Account, (account) => account.petOwners, {})
  @JoinColumn({ name: "accountId", referencedColumnName: "id" })
  account: Account;
}
