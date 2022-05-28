import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Customer } from "./customer.entity";

@Entity("follow")
export class Follow extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ name: "followerId" })
  followerId: number;

  @ManyToOne(() => Customer, (customer) => customer.followers, {})
  @JoinColumn({ name: "followerId", referencedColumnName: "id" })
  follower: Customer;

  @Column({ name: "followedId" })
  followedId: number;

  @ManyToOne(() => Customer, (customer) => customer.followeds, {})
  @JoinColumn({ name: "followedId", referencedColumnName: "id" })
  followed: Customer;

  constructor(partial: Partial<Follow>) {
    super();
    Object.assign(this, partial);
  }
}
