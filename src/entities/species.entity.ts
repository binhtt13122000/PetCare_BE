import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";

@Entity("species")
export class Species {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "text", nullable: false })
  name: string;
  @Column({ type: "text", nullable: true })
  description: string;
  @Column({ type: "bool" })
  isActive: boolean;
  @Column({ type: "bool" })
  isBreeding: boolean;
  @OneToMany(() => Category, (category) => category.id)
  categories: Category[];
}
