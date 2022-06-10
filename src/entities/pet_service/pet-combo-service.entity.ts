import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Service } from "../service/service.entity";
import { PetCombo } from "./pet-combo.entity";

@Entity("pet_combo_service")
export class PetComboService extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "timestamp without time zone", nullable: false })
  workingTime: Date;
  @Column({ type: "timestamp without time zone", nullable: true })
  realTime: Date;
  @Column({ type: "boolean", nullable: true, default: false })
  isCompleted: boolean;
  @Column({ type: "int", nullable: true })
  priority: number;
  @Column({ type: "int", nullable: true })
  star: number;
  @Column({ type: "text", nullable: true })
  review: number;

  @Column({ name: "serviceId" })
  serviceId: number;
  @ManyToOne(() => Service, (service) => service.petComboServices, {})
  @JoinColumn({ name: "serviceId", referencedColumnName: "id" })
  service: Service;

  @Column({ name: "petComboId" })
  petComboId: number;
  @ManyToOne(() => PetCombo, (petCombo) => petCombo.petComboServices, {})
  @JoinColumn({ name: "petComboId", referencedColumnName: "id" })
  petCombo: PetCombo;

  constructor(partial: Partial<PetComboService>) {
    super();
    Object.assign(this, partial);
  }
}
