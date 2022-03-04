import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Pet } from "./pet.entity";

@Entity("paper")
export class Paper extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
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

  @Column({ name: "petId" })
  petId: number;
  @ManyToOne(() => Pet, (pet) => pet.papers, {})
  @JoinColumn({ name: "petId", referencedColumnName: "id" })
  pet: Pet;

  constructor(partial: Partial<Paper>) {
    super();
    Object.assign(this, partial);
  }
}
