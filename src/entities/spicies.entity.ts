import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";

@Entity("spicies")
export class Species {
  @PrimaryGeneratedColumn("increment")
  spiciesId: number;
  @Column({ type: "text", nullable: false })
  name: string;
  @Column({ type: "text", nullable: true })
  description: string;
  @Column({ type: "bool" })
  isActive: string;
  @Column({ type: "bool" })
  isBreeding: string;
  @OneToMany(() => Category, (category) => category.spiciesId)
  categories: Category[];
}
