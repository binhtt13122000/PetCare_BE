import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("ticket")
export class Ticket {
  @PrimaryGeneratedColumn("increment")
  ticketId: number;
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
  @Column({ type: "timestamp without time zone", nullable: true })
  meetingTime: Date;
  @Column({ type: "text" })
  evidence: string;
  @Column({ type: "date", default: new Date() })
  date: Date;
  @Column({ type: "text", nullable: true })
  description: string;
  @Column({ type: "text" })
  status: string;
}
