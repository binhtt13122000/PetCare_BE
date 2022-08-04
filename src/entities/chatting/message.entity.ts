import { MessageEnum } from "src/schemas/message.schema";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Room } from "./room.entity";

@Entity("room")
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({
    type: "bool",
    nullable: true,
  })
  isSellerMessage: boolean;

  @Column({
    type: "text",
    nullable: true,
  })
  content: string;

  @Column({
    type: "enum",
    enum: MessageEnum,
    nullable: true,
  })
  type: MessageEnum;

  @Column({
    type: "timestamp without time zone",
    nullable: true,
  })
  createdTime: Date;

  @Column({ name: "roomId", nullable: true })
  roomId: number;

  @ManyToOne(() => Room, (room) => room.messages)
  @JoinColumn({ name: "roomId", referencedColumnName: "id" })
  room: Room;
}
