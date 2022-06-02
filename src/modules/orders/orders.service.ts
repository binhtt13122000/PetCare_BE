import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { PageMetaDto } from "src/common/page-meta.dto";
import { PageDto } from "src/common/page.dto";
import { Order } from "src/entities/order_service/order.entity";
import { OrderEnum } from "src/enum";
import { Between } from "typeorm";
import { ServiceRankDTO } from "../branches/dtos/statistics-branch.dto";
import { OrderOptionDto } from "./dto/order-option.dto";
import { OrdersRepository } from "./orders.repository";

@Injectable()
export class OrdersService extends BaseService<Order, OrdersRepository> {
  constructor(private readonly ordersRepository: OrdersRepository) {
    super(ordersRepository);
  }

  getOne(id: number): Promise<Order> {
    return this.ordersRepository.findOne({
      where: {
        id: id,
      },
      relations: [
        "branch",
        "orderDetails",
        "orderDetails.service",
        "promotion",
        "customer",
      ],
    });
  }

  async fetchOrders(pageOptionsDto: OrderOptionDto): Promise<PageDto<Order>> {
    const queryBuilder = await this.ordersRepository.createQueryBuilder(
      "order",
    );

    queryBuilder
      .innerJoinAndSelect("order.branch", "branch")
      .innerJoinAndSelect("order.orderDetails", "orderDetails")
      .innerJoinAndSelect("orderDetails.service", "service")
      .where("order.customerId = :customerId", {
        customerId: pageOptionsDto.customerId,
      });

    const { entities } = await queryBuilder.getRawAndEntities();
    const itemCount = await queryBuilder.getCount();
    const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });
    return new PageDto(entities, pageMetaDto);
  }

  getOrdersBranchInMonth(
    id: number,
    firstDate: Date,
    lastDate: Date,
  ): Promise<[Order[], number]> {
    return this.ordersRepository.findAndCount({
      where: {
        branchId: id,
        status: OrderEnum.SUCCESS,
        paymentTime: Between(firstDate, lastDate),
      },
      relations: ["orderDetails"],
    });
  }

  getRankServiceInMonth(
    id: number,
    firstDate: Date,
    lastDate: Date,
  ): Promise<ServiceRankDTO[]> {
    return this.ordersRepository
      .createQueryBuilder("orders")
      .where(
        "orders.branchId = :branchId and orders.status = :status and orders.paymentTime >= :firstDate and orders.paymentTime <= :lastDate",
        {
          branchId: id,
          status: OrderEnum.SUCCESS,
          firstDate: firstDate,
          lastDate: lastDate,
        },
      )
      .leftJoinAndSelect("orders.orderDetails", "orderDetail")
      .leftJoinAndSelect("orderDetail.service", "service")
      .groupBy("orderDetail.serviceId")
      .groupBy("service.name")
      .addGroupBy("orderDetail.serviceId")
      .select(
        "orderDetail.serviceId, count(orderDetail.serviceId), service.name",
      )
      .orderBy("count(orderDetail.serviceId)", "DESC")
      .execute();
  }
}
