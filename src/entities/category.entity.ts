import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("category")
export class Category {
  @PrimaryGeneratedColumn("increment")
  categoryId: number;
  @Column({ type: "text", length: 32, nullable: false })
  name: string;
  @Column({ type: "text", length: 128, nullable: true })
  description: string;
  @Column({ type: "bool", default: () => true })
  isActive: string;
  @JoinColumn({ name: "spiciesId", referencedColumnName: "spiciesId" })
  spiciesId: number;
}
