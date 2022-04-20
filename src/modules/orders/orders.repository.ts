import { Order } from "src/entities/order_service/order.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Order)
export class OrdersRepository extends Repository<Order> {}
