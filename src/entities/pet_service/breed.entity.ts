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
import { IsBoolean, IsString, Length } from "class-validator";

@Entity("breed")
export class Breed {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "text", nullable: false })
  @IsString()
  @Length(8, 32)
  name: string;
  @Column({ type: "text", nullable: true })
  @IsString()
  @Length(8, 256)
  description: string;
  @Column({ type: "bool" })
  @IsBoolean()
  isActive: boolean;

  //references
  @Column({ name: "speciesId" })
  speciesId: number;
  @ManyToOne(() => Species, (species) => species.breeds, {})
  @JoinColumn({ name: "speciesId", referencedColumnName: "id" })
  species: Species;

  @OneToMany(() => Pet, (pet) => pet.breed)
  pets: Pet[];
}
