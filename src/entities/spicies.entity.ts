import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";

@Entity("spicies")
export class Spicies {
  @PrimaryGeneratedColumn("increment")
  spiciesId: number;
  @Column({ type: "text", nullable: false })
  name: string;
  @Column({ type: "text", nullable: true })
  description: string;
  @Column({ type: "bool" })
  isActive: boolean;
  @Column({ type: "bool" })
  isBreeding: boolean;
  @OneToMany(() => Category, (category) => category.spiciesId)
  categories: Category[];
}
