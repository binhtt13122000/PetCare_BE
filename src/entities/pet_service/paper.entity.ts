import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Pet } from "./pet.entity";
import { PaperEnum } from "../../enum/index";
import { IsDate, IsString, Length } from "class-validator";

@Entity("paper")
export class Paper extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "text", nullable: false })
  @IsString()
  @Length(8, 32)
  name: string;
  @Column({ type: "timestamp without time zone", nullable: false })
  @IsDate()
  date: Date;
  @Column({ type: "text", nullable: true })
  evidence: string;
  @Column({ type: "enum", enum: PaperEnum, default: PaperEnum.CERTIFICATE })
  type: PaperEnum;
  @Column({ type: "text", nullable: true })
  @IsString()
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
