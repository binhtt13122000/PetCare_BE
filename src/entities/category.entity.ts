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
  categoryId: number;
  @Column({ type: "text", nullable: false })
  name: string;
  @Column({ type: "text", nullable: true })
  description: string;
  @Column({ type: "bool" })
  isActive: boolean;
  @ManyToOne(() => Species, (species) => species.categories, {})
  @JoinColumn({ name: "speciesId", referencedColumnName: "speciesId" })
  speciesId: number;
  @OneToMany(() => Pet, (pet) => pet.petId)
  pets: [];
}
