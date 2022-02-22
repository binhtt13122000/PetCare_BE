import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Pet } from "./pet.entity";
import { Spicies } from "./spicies.entity";

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
  @ManyToOne(() => Spicies, (spicies) => spicies.categories, {})
  @JoinColumn({ name: "spiciesId", referencedColumnName: "spiciesId" })
  spiciesId: number;
  @OneToMany(() => Pet, (pet) => pet.petId)
  pets: [];
}
