import { IsString, IsDate } from "class-validator";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Vaccine } from "./vaccine.entity";
import { Pet } from "./pet.entity";
import { Branch } from "../user_management_service/branch.entity";

@Entity("vaccine_pet_record")
export class VaccinePetRecord extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "timestamp without time zone", default: new Date() })
  @IsDate()
  dateOfInjection: Date;
  @Column({ type: "text", nullable: true })
  @IsString()
  description: string;
  @Column({ type: "text", nullable: false })
  @IsString()
  type: string;

  //references
  @Column({ name: "vaccineId" })
  vaccineId: number;

  @ManyToOne(() => Vaccine, (vaccine) => vaccine.vaccinePetRecords, {})
  @JoinColumn({ name: "vaccineId", referencedColumnName: "id" })
  vaccine: Vaccine;

  @Column({ name: "petId" })
  petId: number;

  @ManyToOne(() => Pet, (pet) => pet.vaccinePetRecords, {})
  @JoinColumn({ name: "petId", referencedColumnName: "id" })
  pet: Pet;

  @Column({ name: "branchId" })
  branchId: number;
  @ManyToOne(() => Branch, (branch) => branch.vaccinePetRecords, {})
  @JoinColumn({ name: "branchId", referencedColumnName: "id" })
  branch: Branch;

  constructor(partial: Partial<VaccinePetRecord>) {
    super();
    Object.assign(this, partial);
  }
}
