import { EntityRepository, Repository } from "typeorm";
import { Combo } from "src/entities/service/combo.entity";

@EntityRepository(Combo)
export class CombosRepository extends Repository<Combo> {}
