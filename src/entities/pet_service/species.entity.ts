import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IsString, IsBoolean } from "class-validator";
import { Breed } from "./breed.entity";
import { Service } from "src/entities/service/service.entity";

@Entity("species")
export class Species extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "text", nullable: false, unique: true })
  @IsString()
  name: string;
  @Column({ type: "text", nullable: true })
  @IsString()
  description: string;
  @Column({ type: "bool" })
  @IsBoolean()
  isActive: boolean;
  @Column({ type: "bool" })
  @IsBoolean()
  isBreeding: boolean;
  @Column({ type: "bool" })
  @IsBoolean()
  isInject: boolean;
  @OneToMany(() => Breed, (breed) => breed.species)
  breeds: Breed[];

  @OneToMany(() => Service, (service) => service.species)
  services: Service[];

  constructor(partial: Partial<Species>) {
    super();
    Object.assign(this, partial);
  }
}
