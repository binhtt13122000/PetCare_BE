import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
  constructor(partial: Partial<TransactionFee>) {
    super();
    Object.assign(this, partial);
  }
}