import { IsString, IsBoolean } from "class-validator";
import { HealthPetRecord } from "./health-pet-record.entity";
import { Service } from "src/entities/service/service.entity";
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
  @Column({ type: "text", nullable: false, unique: true })
  @IsString()
  name: string;
  @Column({ type: "text", nullable: true })
  @IsString()
  description: string;
  @Column({ type: "text", nullable: true })
  @IsString()
  origin: string;
  @OneToMany(() => Service, (service) => service.vaccine)
  services: Service[];
  @Column({ type: "bool", default: true })
  @IsBoolean()
  isActive: boolean;
  @OneToMany(
    () => HealthPetRecord,
    (healthPetRecord) => healthPetRecord.vaccine,
  )
  healthPetRecords: HealthPetRecord[];

  constructor(partial: Partial<Vaccine>) {
    super();
    Object.assign(this, partial);
  }
}
