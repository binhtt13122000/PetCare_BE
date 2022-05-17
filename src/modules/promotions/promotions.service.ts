import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { Promotion } from "src/entities/service/promotion.entity";
import { PromotionsRepository } from "./promotions.repository";

@Injectable()
export class PromotionsService extends BaseService<
  Promotion,
  PromotionsRepository
> {
  constructor(private readonly promotionsRepository: PromotionsRepository) {
    super(promotionsRepository);
  }
}