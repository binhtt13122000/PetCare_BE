import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("media")
export class Media {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "text", nullable: false })
  url: string;
  @Column({ type: "text", nullable: false })
  type: string;
  @Column({ type: "bool", default: true })
  status: boolean;
}
