import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("category")
export class Category {
  @PrimaryGeneratedColumn("increment")
  categoryId: number;
  @Column({ type: "text", nullable: false })
  name: string;
  @Column({ type: "text", nullable: true })
  description: string;
  @Column({ type: "bool" })
  isActive: string;
  @JoinColumn({ name: "spiciesId", referencedColumnName: "spiciesId" })
  spiciesId: number;
}
