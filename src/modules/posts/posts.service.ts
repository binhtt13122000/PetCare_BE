import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { Post } from "src/entities/transaction_service/post.entity";
import { PostsRepository } from "./posts.repository";

@Injectable()
export class PostsService extends BaseService<Post, PostsRepository> {
  constructor(private readonly postsRepository: PostsRepository) {
    super(postsRepository);
  }
}
