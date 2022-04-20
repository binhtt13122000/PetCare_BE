import { ApiProperty } from "@nestjs/swagger";
import { Order } from "src/entities/order_service/order.entity";
import { OrderEnum } from "../../../enum/index";
import { Service } from "../../../entities/service/service.entity";
export class CreateOrderDTO {
  @ApiProperty()
  provisionalTotal: number;
  @ApiProperty()
  orderTotal: number;
  status: OrderEnum = OrderEnum.WAITING;
  @ApiProperty({ required: false })
  description: string;
  @ApiProperty()
  orderDetails: CreateOrderDetailDTO[];
  @ApiProperty()
  staffId: number;
  @ApiProperty()
  customerId: number;
}

export class CreateOrderDetailDTO {
  id: number = null;
  orderId: number = null;
  order: Order = null;
  service: Service = null;
  @ApiProperty()
  price: number;
  @ApiProperty({ required: false })
  description: string;
  @ApiProperty()
  serviceId: number;
}
