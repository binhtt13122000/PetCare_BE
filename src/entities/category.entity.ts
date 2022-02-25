import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Pet } from "./pet.entity";
import { Species } from "./species.entity";

@Entity("category")
export class Category {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "text", nullable: false })
  name: string;
  @Column({ type: "text", nullable: true })
  description: string;
  @Column({ type: "bool" })
  isActive: boolean;
  @ManyToOne(() => Species, (species) => species.categories, {})
  @JoinColumn({ name: "speciesId", referencedColumnName: "id" })
  speciesId: number;
  @OneToMany(() => Pet, (pet) => pet.id)
  pets: [];
}
