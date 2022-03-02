import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { HealthService } from "./health-service.entity";
import { Pet } from "./pet.entity";

@Entity("health_record")
export class HealthRecord {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "date", nullable: false })
  dateOfExam: Date;
  @Column({ type: "integer", nullable: false })
  weight: number;
  @Column({ type: "integer", nullable: false })
  height: number;
  @Column({ type: "integer", nullable: false })
  totalPrice: number;
  @Column({ type: "text", nullable: false })
  evidence: string;
  @Column({ type: "text", nullable: true })
  description: string;
  @Column({ type: "bool", default: true })
  isPeriodical: boolean;
  @Column({ type: "integer", nullable: true })
  promotion: number;
  @Column({ type: "bool", default: true })
  status: boolean;

  @Column({ name: "petId" })
  petId: number;
  @ManyToOne(() => Pet, (pet) => pet.healthRecords, {})
  @JoinColumn({ name: "petId", referencedColumnName: "id" })
  pet: Pet;

  @OneToMany(() => HealthService, (healthService) => healthService.id)
  healthServices: [];
}
