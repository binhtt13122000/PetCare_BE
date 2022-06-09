import { ComboTypeEnum } from "src/enum";
import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Entity,
  Column,
  OneToMany,
} from "typeorm";
import { PetCombo } from "../pet_service/pet-combo.entity";
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
  @Column({ type: "enum", enum: ComboTypeEnum, nullable: false })
  type: ComboTypeEnum;

  @OneToMany(() => ComboService, (comboService) => comboService.combo, {
    cascade: true,
  })
  comboServices: ComboService[];

  @OneToMany(() => PetCombo, (petCombo) => petCombo.combo, {})
  petCombos: PetCombo[];

  constructor(partial: Partial<Combo>) {
    super();
    Object.assign(this, partial);
  }
}
