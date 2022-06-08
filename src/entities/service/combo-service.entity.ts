import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Combo } from "./combo.entity";
import { Service } from "./service.entity";

@Entity("combo_service")
export class ComboService extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "int", nullable: false })
  priority: number;
  @Column({ type: "int", nullable: false })
  nextEvent: number;

  @Column({ type: "bool", nullable: false, default: true })
  isActive: boolean;

  @Column({ name: "comboId" })
  comboId: number;
  @ManyToOne(() => Combo, (combo) => combo.comboServices)
  @JoinColumn({ name: "comboId", referencedColumnName: "id" })
  combo: Combo;

  @Column({ name: "serviceId" })
  serviceId: number;
  @ManyToOne(() => Service, (service) => service.comboServices, {})
  @JoinColumn({ name: "serviceId", referencedColumnName: "id" })
  service: Service;

  constructor(partial: Partial<ComboService>) {
    super();
    Object.assign(this, partial);
  }
}
