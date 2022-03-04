import { EntityRepository, Repository } from "typeorm";
import { Paper } from "src/entities/paper.entity";

@EntityRepository(Paper)
export class PapersRepository extends Repository<Paper> {}
