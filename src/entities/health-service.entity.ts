import {
  Column,
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
  @Column({ type: "integer", nullable: false })
  price: number;
  @Column({ type: "date", nullable: false })
  date: Date;
  @Column({ type: "text", nullable: false })
  evidence: string;
  @Column({ type: "text", nullable: true })
  description: string;
  @Column({ type: "bool", default: true })
  status: boolean;

  @Column({ name: "healthRecordId" })
  healthRecordId: number;
  @ManyToOne(
    () => HealthRecord,
    (healthRecord) => healthRecord.healthServices,
    {},
  )
  @JoinColumn({ name: "healthRecordId", referencedColumnName: "id" })
  healthRecord: HealthRecord;

  @Column({ name: "serviceId" })
  serviceId: number;
  @ManyToOne(() => Service, (service) => service.healthServices, {})
  @JoinColumn({ name: "serviceId", referencedColumnName: "id" })
  service: Service;
}
