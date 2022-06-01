import { IsBoolean } from "class-validator";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Pet } from "./pet.entity";
import { Customer } from "../user_management_service/customer.entity";
import { BaseEntity } from "typeorm";

@Entity("pet_owner")
export class PetOwner extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "bool", default: true })
  @IsBoolean()
  isCurrentOwner: boolean;
  @Column({ type: "timestamp without time zone", nullable: false })
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

  constructor(partial: Partial<PetOwner>) {
    super();
    Object.assign(this, partial);
  }
}
