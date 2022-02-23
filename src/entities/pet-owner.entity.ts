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
  petOwnerId: number;
  @Column({ type: "bool", default: true })
  isCurrentOwner: boolean;
  @Column({ type: "date", nullable: false })
  date: Date;
  @ManyToOne(() => Pet, (pet) => pet.petOwners, {})
  @JoinColumn({ name: "petId", referencedColumnName: "petId" })
  petId: number;
  @ManyToOne(() => Account, (account) => account.petOwners, {})
  @JoinColumn({ name: "accountId", referencedColumnName: "accountId" })
  accountId: number;
}
