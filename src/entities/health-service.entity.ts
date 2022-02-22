import {
  Column,
  Double,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { HealthRecord } from "./health-record.entity";
import { Service } from "./service.entity";

export class HealthService {
  @PrimaryGeneratedColumn("increment")
  healthServiceId: number;
  @Column({ type: "float", nullable: false })
  price: Double;
  @Column({ type: "date", nullable: false })
  date: Date;
  @Column({ type: "text", nullable: false })
  evidence: string;
  @Column({ type: "text", nullable: true })
  description: string;
  @Column({ type: "bool", default: true })
  status: boolean;
  @ManyToOne(
    () => HealthRecord,
    (healthRecord) => healthRecord.healthServices,
    {},
  )
  @JoinColumn({
    name: "healthRecordId",
    referencedColumnName: "healthRecordId",
  })
  healthRecordId: number;
  @ManyToOne(() => Service, (service) => service.healthServices, {})
  @JoinColumn({ name: "serviceId", referencedColumnName: "serviceId" })
  serviceId: number;
}
