import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { HealthRecord } from "./health-record.entity";
import { Service } from "../service/service.entity";

@Entity("health_service")
export class HealthService extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "integer", nullable: false })
  price: number;
  @Column({ type: "text", nullable: true })
  evidence: string;
  @Column({ type: "text", nullable: false })
  content: string;
  @Column({ type: "text", nullable: false })
  petStatus: string;

  //references
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

  constructor(partial: Partial<HealthService>) {
    super();
    Object.assign(this, partial);
  }
}
