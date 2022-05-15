import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { HealthService } from "./health-service.entity";
import { Pet } from "../pet_service/pet.entity";
import { IsDate, IsInt } from "class-validator";
import { Branch } from "../user_management_service/branch.entity";

@Entity("health_record")
export class HealthRecord {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "timestamp without time zone", nullable: false })
  @IsDate()
  dateOfExam: Date;
  @IsDate()
  @Column({ type: "timestamp without time zone", nullable: true })
  nextHealthCheck: Date;
  @Column({ type: "integer", nullable: false })
  @IsInt()
  weight: number;
  @Column({ type: "text", nullable: false })
  content: string;
  @Column({ type: "bool", default: true })
  isPeriodical: boolean;
  @Column({ type: "text", nullable: false })
  petStatus: string;

  @Column({ name: "petId" })
  petId: number;
  @ManyToOne(() => Pet, (pet) => pet.healthRecords, {})
  @JoinColumn({ name: "petId", referencedColumnName: "id" })
  pet: Pet;

  @Column({ name: "branchId" })
  branchId: number;
  @ManyToOne(() => Branch, (branch) => branch.healthRecords, {})
  @JoinColumn({ name: "branchId", referencedColumnName: "id" })
  branch: Branch;

  @OneToMany(() => HealthService, (healthService) => healthService.healthRecord)
  healthServices: HealthService[];
}
