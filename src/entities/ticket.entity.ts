import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("ticket")
export class Ticket {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "text", nullable: false })
  name: string;
  @Column({ type: "text", nullable: false })
  phoneNumber: string;
  @Column({ type: "text", nullable: true })
  email: string;
  @Column({ type: "text", nullable: false })
  type: string;
  @Column({ type: "text", nullable: true })
  title: string;
  @Column({ type: "time without time zone", nullable: true })
  meetingTime: string;
  @Column({ type: "text" })
  evidence: string;
  @Column({ type: "date", default: new Date() })
  date: Date;
  @Column({ type: "text", nullable: true })
  description: string;
  @Column({ type: "text" })
  status: string;
}
