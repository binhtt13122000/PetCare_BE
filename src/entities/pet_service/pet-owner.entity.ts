import { IsBoolean, IsDate } from "class-validator";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Pet } from "./pet.entity";
import { Customer } from "../user_management_service/customer.entity";

@Entity("pet_owner")
export class PetOwner {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "bool", default: true })
  @IsBoolean()
  isCurrentOwner: boolean;
  @Column({ type: "date", nullable: false })
  @IsDate()
  date: Date;

  @Column({ name: "petId" })
  petId: number;
  @ManyToOne(() => Pet, (pet) => pet.petOwners, {})
  @JoinColumn({ name: "petId", referencedColumnName: "id" })
  pet: Pet;

  @Column({ name: "customerId" })
  customerId: number;
  @ManyToOne(() => Customer, (customer) => customer.petOwners, {})
  @JoinColumn({ name: "customerId", referencedColumnName: "id" })
  customer: Customer;
}
