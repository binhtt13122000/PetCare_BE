import { RoomStatusEnum, ServiceEnum } from "src/enum";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Message } from "./message.entity";
import { Customer } from "../user_management_service/customer.entity";
import { Post } from "../transaction_service/post.entity";

@Entity("room")
export class Room extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ name: "buyerId" })
  buyerId: number;

  @ManyToOne(() => Customer, (customer) => customer.rooms)
  @JoinColumn({ name: "buyerId", referencedColumnName: "id" })
  buyer: Customer;

  @Column({ name: "postId" })
  postId: number;

  @ManyToOne(() => Post, (post) => post.rooms)
  @JoinColumn({ name: "postId", referencedColumnName: "id" })
  post: Post;

  @Column({
    type: "timestamp without time zone",
    nullable: true,
  })
  newestMessageTime: Date;

  @Column({
    type: "text",
    nullable: true,
  })
  newestMessage: string;

  @Column({
    type: "bool",
    nullable: true,
  })
  isSellerMessage: boolean;

  @Column({
    type: "timestamp without time zone",
    nullable: true,
  })
  sellerLastViewTime: Date;

  @Column({
    type: "timestamp without time zone",
    nullable: true,
  })
  buyerLastViewTime: Date;

  @Column({
    type: "timestamp without time zone",
    nullable: true,
  })
  transactionTime: Date;

  @Column({
    type: "text",
    nullable: true,
  })
  transactionPlace: string;

  @Column({
    type: "text",
    nullable: true,
  })
  description: string;

  @Column({
    type: "timestamp without time zone",
    nullable: true,
  })
  createdTime: Date;

  @Column({
    type: "enum",
    enum: ServiceEnum,
    nullable: true,
  })
  type: ServiceEnum;

  @Column({
    type: "enum",
    enum: RoomStatusEnum,
    nullable: true,
  })
  status: RoomStatusEnum;

  @OneToMany(() => Message, (message) => message.room)
  messages: Message[];
}
