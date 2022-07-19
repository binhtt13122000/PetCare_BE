import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { PageMetaDto } from "src/common/page-meta.dto";
import { PageDto } from "src/common/page.dto";
import { Order } from "src/entities/order_service/order.entity";
import { OrderEnum } from "src/enum";
import { ServiceRankDTO } from "../branches/dtos/statistics-branch.dto";
import { OrderOptionDto } from "./dto/order-option.dto";
import { StatisticOrderDTO } from "./dto/statistic-order.dto";
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
        "orderDetails.service.vaccine",
        "orderDetails.breedTransaction",
        "orderDetails.petCombo",
        "orderDetails.petCombo.combo",
        "promotion",
        "customer",
      ],
    });
  }

  getOneWithOrderDetails(id: number): Promise<Order> {
    return this.ordersRepository.findOne({
      where: { id: id },
      relations: [
        "orderDetails",
        "orderDetails.service",
        "orderDetails.breedTransaction",
        "orderDetails.petCombo",
        "orderDetails.petCombo.combo",
      ],
    });
  }

  getOrdersByBreedingTransactionId(id: number): Promise<number[]> {
    return this.ordersRepository
      .createQueryBuilder("orders")
      .leftJoinAndSelect("orders.orderDetails", "orderDetails")
      .where(
        "orderDetails.breedTransactionId = :breedTransactionId and orders.status IN(:...status)",
        {
          breedTransactionId: id,
          status: [OrderEnum.WAITING, OrderEnum.SUCCESS],
        },
      )
      .select('orders.id as "id"')
      .execute();
  }

  getOrdersByPetComboId(id: number): Promise<number[]> {
    return this.ordersRepository
      .createQueryBuilder("orders")
      .leftJoinAndSelect("orders.orderDetails", "orderDetails")
      .where(
        "orderDetails.petComboId = :petComboId and orders.status = :status",
        {
          petComboId: id,
          status: OrderEnum.WAITING,
        },
      )
      .select('orders.id as "id"')
      .execute();
  }

  async fetchOrders(pageOptionsDto: OrderOptionDto): Promise<PageDto<Order>> {
    const queryBuilder = await this.ordersRepository.createQueryBuilder(
      "orders",
    );

    queryBuilder
      .leftJoinAndSelect("orders.branch", "branch")
      .leftJoinAndSelect("orders.orderDetails", "orderDetails")
      .leftJoinAndSelect("orderDetails.service", "service")
      .where("orders.customerId = :customerId", {
        customerId: pageOptionsDto.customerId,
      })
      .orderBy("orders.registerTime", "DESC");

    const { entities } = await queryBuilder.getRawAndEntities();
    const itemCount = await queryBuilder.getCount();
    const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });
    return new PageDto(entities, pageMetaDto);
  }

  getOrdersBranchInMonth(
    branchId: number,
    firstDate: Date,
    lastDate: Date,
  ): Promise<StatisticOrderDTO[]> {
    return this.ordersRepository
      .createQueryBuilder("orders")
      .where(
        branchId
          ? "orders.branchId = :branchId and orders.status = :status and orders.paymentTime >= :firstDate and orders.paymentTime <= :lastDate"
          : "orders.status = :status and orders.paymentTime >= :firstDate and orders.paymentTime <= :lastDate",
        branchId
          ? {
              branchId: branchId,
              status: OrderEnum.SUCCESS,
              firstDate: firstDate,
              lastDate: lastDate,
            }
          : {
              status: OrderEnum.SUCCESS,
              firstDate: firstDate,
              lastDate: lastDate,
            },
      )
      .leftJoinAndSelect("orders.branch", "branch")
      .groupBy("orders.branchId")
      .addGroupBy("branch.name")
      .addGroupBy("branch.representativeName")
      .select(
        'orders.branchId, SUM(orders.orderTotal) as "orderTotal", COUNT(orders.id) as "numberOrdersInMonth", branch.name, branch.representativeName',
      )
      .execute();
  }

  getRankServiceInMonth(
    branchId: number,
    firstDate: Date,
    lastDate: Date,
  ): Promise<ServiceRankDTO[]> {
    return this.ordersRepository
      .createQueryBuilder("orders")
      .leftJoinAndSelect("orders.orderDetails", "orderDetail")
      .leftJoinAndSelect("orderDetail.service", "service")
      .where(
        branchId
          ? "orders.branchId = :branchId and orders.status = :status and orders.paymentTime >= :firstDate and orders.paymentTime <= :lastDate and orderDetail.serviceId IS NOT NULL"
          : "orders.status = :status and orders.paymentTime >= :firstDate and orders.paymentTime <= :lastDate  and orderDetail.serviceId IS NOT NULL",
        branchId
          ? {
              branchId: branchId,
              status: OrderEnum.SUCCESS,
              firstDate: firstDate,
              lastDate: lastDate,
            }
          : {
              status: OrderEnum.SUCCESS,
              firstDate: firstDate,
              lastDate: lastDate,
            },
      )
      .groupBy("orderDetail.serviceId")
      .groupBy("service.name")
      .addGroupBy("orderDetail.serviceId")
      .select(
        "orderDetail.serviceId, count(orderDetail.serviceId), service.name",
      )
      .orderBy("count(orderDetail.serviceId)", "DESC")
      .execute();
  }

  getOrdersAvailableInSpecificDate(
    date: string,
    status: OrderEnum,
  ): Promise<Order[]> {
    return this.ordersRepository.find({
      where: {
        registerTime: date,
        status: status,
      },
    });
  }

  getOrdersAvailableByCustomerId(
    customerId: number,
    status: OrderEnum,
  ): Promise<Order[]> {
    return this.ordersRepository.find({
      where: {
        customerId: customerId,
        status: status,
      },
    });
  }
}
