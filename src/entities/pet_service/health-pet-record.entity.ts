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
import { HealthPetRecordEnum } from "src/enum";

@Entity("health_pet_record")
export class HealthPetRecord extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "timestamp without time zone" })
  dateOfInjection: Date;
  @Column({ type: "text", nullable: true })
  description: string;
  @Column({ type: "text", nullable: true })
  vaccineType: string;

  @Column({ type: "text", nullable: false })
  type: HealthPetRecordEnum;

  //references
  @Column({ name: "vaccineId", nullable: true })
  vaccineId: number;

  @ManyToOne(() => Vaccine, (vaccine) => vaccine.healthPetRecords, {})
  @JoinColumn({ name: "vaccineId", referencedColumnName: "id" })
  vaccine: Vaccine;

  @Column({ name: "petId" })
  petId: number;

  @ManyToOne(() => Pet, (pet) => pet.healthPetRecords, {})
  @JoinColumn({ name: "petId", referencedColumnName: "id" })
  pet: Pet;

  @Column({ name: "branchId" })
  branchId: number;
  @ManyToOne(() => Branch, (branch) => branch.healthPetRecords, {})
  @JoinColumn({ name: "branchId", referencedColumnName: "id" })
  branch: Branch;

  constructor(partial: Partial<HealthPetRecord>) {
    super();
    Object.assign(this, partial);
  }
}
