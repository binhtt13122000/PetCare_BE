import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Service } from "./service.entity";

@Entity("service_fee")
export class ServiceFee extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "int", nullable: true })
  min: number;
  @Column({ type: "int", nullable: true })
  max: number;
  @Column({ type: "int", nullable: false })
  price: number;

  //references
  @Column({ name: "serviceId" })
  serviceId: number;
  @ManyToOne(() => Service, (service) => service.serviceFees, {})
  @JoinColumn({ name: "serviceId", referencedColumnName: "id" })
  service: Service;

  constructor(partial: Partial<ServiceFee>) {
    super();
    Object.assign(this, partial);
  }
}
