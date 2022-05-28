import { ReportEnum } from "src/enum";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Customer } from "./customer.entity";
import { BaseEntity } from "typeorm";

@Entity("report")
export class Report extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "text", nullable: false })
  description: string;

  @Column({ type: "text", nullable: true })
  evidence: string;

  @Column({ type: "enum", nullable: false, enum: ReportEnum })
  type: ReportEnum;

  @Column({
    type: "timestamp without time zone",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdTime: Date;

  @Column({ name: "reporterId" })
  reporterId: number;

  @ManyToOne(() => Customer, (customer) => customer.reporters, {})
  @JoinColumn({ name: "reporterId", referencedColumnName: "id" })
  reporter: Customer;

  @Column({ name: "reportedUserId" })
  reportedUserId: number;

  @ManyToOne(() => Customer, (customer) => customer.reporteds, {})
  @JoinColumn({ name: "reportedUserId", referencedColumnName: "id" })
  reportedUser: Customer;

  constructor(partial: Partial<Report>) {
    super();
    Object.assign(this, partial);
  }
}
