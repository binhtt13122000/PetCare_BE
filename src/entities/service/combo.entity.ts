import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Entity,
  Column,
  OneToMany,
} from "typeorm";
import { ComboService } from "./combo-service.entity";

@Entity("combo")
export class Combo extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "int", nullable: false })
  price: number;
  @Column({ type: "text", nullable: false, unique: true })
  name: string;
  @Column({ type: "text", nullable: true })
  description: string;
  @Column({ type: "bool", nullable: false, default: true })
  isActive: boolean;

  @OneToMany(() => ComboService, (comboService) => comboService.combo, {
    cascade: true,
  })
  comboServices: ComboService[];

  constructor(partial: Partial<Combo>) {
    super();
    Object.assign(this, partial);
  }
}
