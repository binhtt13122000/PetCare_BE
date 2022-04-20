import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { Order } from "src/entities/order_service/order.entity";
import { OrdersRepository } from "./orders.repository";

@Injectable()
export class OrdersService extends BaseService<Order, OrdersRepository> {
  constructor(private readonly ordersRepository: OrdersRepository) {
    super(ordersRepository);
  }
}
