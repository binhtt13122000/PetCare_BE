import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Pet } from "./pet.entity";

export class Paper {
  @PrimaryGeneratedColumn("increment")
  paperId: number;
  @Column({ type: "text", nullable: false })
  name: string;
  @Column({ type: "date", nullable: false })
  date: Date;
  @Column({ type: "text", nullable: false })
  evidence: string;
  @Column({ type: "text", nullable: false })
  type: string;
  @Column({ type: "bool", default: true })
  status: boolean;
  @Column({ type: "text" })
  description: string;
  @ManyToOne(() => Pet, (pet) => pet.papers, {})
  @JoinColumn({ name: "petId", referencedColumnName: "petId" })
  petId: number;
}
