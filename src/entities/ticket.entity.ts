import { TicketEnum } from "src/enum";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Media } from "./media.entity";

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
  @Column({ type: "enum", enum: TicketEnum })
  status: TicketEnum;
  @OneToMany(() => Media, (media) => media.id)
  medias: [];
  @Column({ type: "text", nullable: true })
  cancelReason: string;
}
