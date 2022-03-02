import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("promotion")
export class Promotion {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "text", nullable: false })
  name: string;
  @Column({ type: "integer", nullable: false })
  promo: number;
  @Column({ type: "date", nullable: false })
  startTime: Date;
  @Column({ type: "date", nullable: false })
  expireTime: Date;
  @Column({ type: "text", nullable: true })
  description: string;
  @Column({ type: "bool", nullable: false, default: true })
  status: boolean;
}
