import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";

@Entity("spicies")
export class Species {
  @PrimaryGeneratedColumn("increment")
  spiciesId: number;
  @Column({ type: "text", length: 32, nullable: false })
  name: string;
  @Column({ type: "text", length: 128, nullable: true })
  description: string;
  @Column({ type: "bool", default: () => true })
  isActive: string;
  @Column({ type: "bool", default: () => true })
  isBreeding: string;
  @OneToMany(() => Category, (category) => category.spiciesId)
  categories: Category[];
}
