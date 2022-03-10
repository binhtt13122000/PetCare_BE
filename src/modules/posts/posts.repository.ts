import { EntityRepository, Repository } from "typeorm";
import { Post } from "src/entities/post.entity";

@EntityRepository(Post)
export class PostsRepository extends Repository<Post> {}
