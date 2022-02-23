import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
} from "typeorm";
import { Pet } from "./pet.entity";

@Entity("vaccine")
export class Vaccine {
  @PrimaryGeneratedColumn("increment")
  vaccineId: number;
  @Column({ type: "text", nullable: false })
  name: string;
  @Column({ type: "timestamp without time zone" })
  dateOfInjection: Timestamp;
  @Column({ type: "text", nullable: false })
  evidence: string;
  @Column({ type: "text", nullable: true })
  description: string;
  @Column({ type: "bool", default: true })
  status: boolean;
  @ManyToOne(() => Pet, (pet) => pet.vaccines, {})
  @JoinColumn({ name: "petId", referencedColumnName: "petId" })
  petId: number;
}
