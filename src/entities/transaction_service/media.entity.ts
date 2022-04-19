import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Post } from "./post.entity";
import { BaseEntity } from "typeorm";

@Entity("media")
export class Media extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "text", nullable: false })
  url: string;
  @Column({ type: "text", nullable: false })
  type: "image" | "video";

  @Column({ name: "postId" })
  postId: number;

  @ManyToOne(() => Post, (post) => post.medias, {})
  @JoinColumn({
    name: "postId",
    referencedColumnName: "id",
  })
  post: Post;

  breedingTransactionSellerContractId: number;

  constructor(partial: Partial<Media>) {
    super();
    Object.assign(this, partial);
  }
}
