import { Column, Double, PrimaryGeneratedColumn } from "typeorm";

export class Promotion {
  @PrimaryGeneratedColumn("increment")
  promotionId: number;
  @Column({ type: "text", nullable: false })
  name: string;
  @Column({ type: "float", nullable: false })
  promo: Double;
  @Column({ type: "date", nullable: false })
  startTime: Date;
  @Column({ type: "date", nullable: false })
  expireTime: Date;
  @Column({ type: "text", nullable: true })
  description: string;
  @Column({ type: "bool", nullable: false, default: true })
  status: boolean;
}
