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
    type: "timestamp without time zone",
    nullable: false,
  })
  startDate: Date;
  @Column({
    type: "timestamp without time zone",
    nullable: false,
  })
  endDate: Date;
  @Column({
    type: "enum",
    nullable: true,
    enum: ServiceEnum,
  })
  type: ServiceEnum;
  constructor(partial: Partial<TransactionFee>) {
    super();
    Object.assign(this, partial);
  }
}
