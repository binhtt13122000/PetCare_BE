import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsString, Length, IsBoolean } from "class-validator";
import { Breed } from "./breed.entity";

@Entity("species")
export class Species {
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
  @Column({ type: "bool" })
  @IsBoolean()
  isBreeding: boolean;
  @Column({ type: "bool" })
  @IsBoolean()
  isInject: boolean;
  @OneToMany(() => Breed, (breed) => breed.id)
  breeds: Breed[];
}
