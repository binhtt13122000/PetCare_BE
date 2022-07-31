import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ServiceEnum } from "src/enum/index";
import { Post } from "../transaction_service/post.entity";

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

  @OneToMany(() => Post, (post) => post.transactionFee)
  posts: Post[];
  constructor(partial: Partial<TransactionFee>) {
    super();
    Object.assign(this, partial);
  }
}
