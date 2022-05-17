import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { PageMetaDto } from "src/common/page-meta.dto";
import { PageDto } from "src/common/page.dto";
import { OrderDetail } from "src/entities/order_service/order-detail.entity";
import { OrderDetailOptionDto } from "./dto/order-detail-option.dto";
import { OrderDetailRepostiory } from "./order-details.repository";

@Injectable()
export class OrderDetailsService extends BaseService<
  OrderDetail,
  OrderDetailRepostiory
> {
  constructor(private readonly orderDetailRepository: OrderDetailRepostiory) {
    super(orderDetailRepository);
  }

  async fetchOrderDetail(
    pageOptionsDto: OrderDetailOptionDto,
    isCheck: boolean,
  ): Promise<PageDto<OrderDetail>> {
    const queryBuilder = await this.orderDetailRepository.createQueryBuilder(
      "order_detail",
    );
    queryBuilder
      .where("order_detail.orderId = :orderId", {
        orderId: pageOptionsDto.orderId,
      })
      .innerJoinAndSelect("order_detail.order", "order")
      .innerJoinAndSelect("order_detail.service", "service");

    if (isCheck) {
      queryBuilder.innerJoinAndSelect("order.promotion", "promotion");
    }

    const { entities } = await queryBuilder.getRawAndEntities();
    const itemCount = await queryBuilder.getCount();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(entities, pageMetaDto);
  }
}
