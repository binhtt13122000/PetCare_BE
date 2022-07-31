import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ServiceEnum } from "src/enum/index";

@Entity("transaction_fee")
export class TransactionFee extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "int", nullable: true })
  min: number;
  @Column({ type: "int", nullable: false })
  max: number;
  @Column({ type: "int", nullable: false })
  price: number;
  @Column({
    type: "enum",
    nullable: true,
    enum: ServiceEnum,
  })
  type: ServiceEnum;

  @Column({
    type: "timestamp without time zone",
    nullable: true,
  })
  startTime: Date;
  @Column({
    type: "timestamp without time zone",
    nullable: true,
  })
  endTime: Date;
  constructor(partial: Partial<TransactionFee>) {
    super();
    Object.assign(this, partial);
  }
}
