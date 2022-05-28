import { Follow } from "src/entities/user_management_service/follow.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Follow)
export class FollowsRepository extends Repository<Follow> {}
