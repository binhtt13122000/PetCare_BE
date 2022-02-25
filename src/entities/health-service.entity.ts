import {
  Column,
  Double,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { HealthRecord } from "./health-record.entity";
import { Service } from "./service.entity";

@Entity("health_service")
export class HealthService {
  @PrimaryGeneratedColumn("increment")
  id: number;
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
    referencedColumnName: "id",
  })
  healthRecordId: number;
  @ManyToOne(() => Service, (service) => service.healthServices, {})
  @JoinColumn({ name: "serviceId", referencedColumnName: "id" })
  serviceId: number;
}
