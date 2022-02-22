import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("verification_center")
export class VerificationCenter {
  @PrimaryGeneratedColumn("increment")
  verificationCenterId: number;
  @Column({ type: "text", nullable: false })
  name: string;
  @Column({ type: "bool", default: true })
  status: boolean;
  @Column({ type: "text", nullable: true })
  description: string;
}
