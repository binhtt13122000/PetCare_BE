import { EntityRepository, Repository } from "typeorm";
import { Paper } from "src/entities/pet_service/paper.entity";

@EntityRepository(Paper)
export class PapersRepository extends Repository<Paper> {}
