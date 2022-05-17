import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { PageMetaDto } from "src/common/page-meta.dto";
import { PageDto } from "src/common/page.dto";
import { Order } from "src/entities/order_service/order.entity";
import { OrderOptionDto } from "./dto/order-option.dto";
import { OrdersRepository } from "./orders.repository";

@Injectable()
export class OrdersService extends BaseService<Order, OrdersRepository> {
  constructor(private readonly ordersRepository: OrdersRepository) {
    super(ordersRepository);
  }

  async fetchOrders(pageOptionsDto: OrderOptionDto): Promise<PageDto<Order>> {
    const queryBuilder = await this.ordersRepository.createQueryBuilder(
      "order",
    );

    queryBuilder
      .innerJoinAndSelect("order.orderDetails", "orderDetails")
      .innerJoinAndSelect("orderDetails.service", "service")
      .where("order.customerId = :customerId", {
        customerId: pageOptionsDto.customerId,
      });
    // .innerJoinAndSelect("order.promotion", "promotion");

    const { entities } = await queryBuilder.getRawAndEntities();
    const itemCount = await queryBuilder.getCount();
    const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });
    return new PageDto(entities, pageMetaDto);
  }

  async fetchOrderDetails(
    pageOptionsDto: OrderOptionDto,
  ): Promise<PageDto<Order>> {
    const queryBuilder = await this.ordersRepository.createQueryBuilder(
      "order",
    );

    queryBuilder.where("order. = :customerId", {
      customerId: pageOptionsDto.customerId,
    });

    const { entities } = await queryBuilder.getRawAndEntities();
    const itemCount = await queryBuilder.getCount();
    const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });
    return new PageDto(entities, pageMetaDto);
  }
}
