import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Pet } from "./pet.entity";
import { Species } from "./species.entity";
import { IsBoolean, IsString } from "class-validator";

@Entity("breed")
export class Breed extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "text", nullable: false })
  @IsString()
  name: string;
  @Column({ type: "text", nullable: true })
  @IsString()
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

  constructor(partial: Partial<Breed>) {
    super();
    Object.assign(this, partial);
  }
}
