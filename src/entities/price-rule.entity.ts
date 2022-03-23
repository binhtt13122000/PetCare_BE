import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("price_rule")
export class PriceRule extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "int", nullable: true })
  min: number;
  @Column({ type: "int", nullable: false })
  max: number;
  @Column({ type: "int", nullable: false })
  percent: number;
  @Column({ type: "int", nullable: false })
  depositPercent: number;
  constructor(partial: Partial<PriceRule>) {
    super();
    Object.assign(this, partial);
  }
}
