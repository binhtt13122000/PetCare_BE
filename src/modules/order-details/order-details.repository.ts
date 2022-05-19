import { OrderDetail } from "src/entities/order_service/order-detail.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(OrderDetail)
export class OrderDetailRepostiory extends Repository<OrderDetail> {}
