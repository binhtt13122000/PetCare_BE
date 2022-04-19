import { Length, IsString, IsBoolean } from "class-validator";
import { VaccinePetRecord } from "./vaccine-pet-record.entity";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("vaccine")
export class Vaccine extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "text", nullable: false })
  @Length(8, 32)
  @IsString()
  name: string;
  @Column({ type: "text", nullable: true })
  @Length(8, 1024)
  @IsString()
  description: string;
  @Column({ type: "text", nullable: true })
  @Length(8, 1024)
  @IsString()
  origin: string;
  @Column({ type: "bool", default: true })
  @IsBoolean()
  isActive: boolean;
  @OneToMany(
    () => VaccinePetRecord,
    (vaccinePetRecord) => vaccinePetRecord.vaccine,
  )
  vaccinePetRecords: VaccinePetRecord[];

  constructor(partial: Partial<Vaccine>) {
    super();
    Object.assign(this, partial);
  }
}
