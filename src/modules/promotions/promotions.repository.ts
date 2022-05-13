import { Promotion } from "src/entities/service/promotion.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Promotion)
export class PromotionsRepository extends Repository<Promotion> {}
