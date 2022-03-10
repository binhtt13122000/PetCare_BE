import { Controller, Body, Post } from "@nestjs/common";
import { Post as PostEntity } from "src/entities/post.entity";
import { PostsService } from "./posts.service";

@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async createPost(@Body() body: Partial<PostEntity>): Promise<PostEntity> {
    return null;
  }
}
