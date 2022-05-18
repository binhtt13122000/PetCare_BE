import { ApiProperty } from "@nestjs/swagger";
import { Order } from "src/entities/order_service/order.entity";
import { OrderEnum } from "src/enum";
import { Service } from "src/entities/service/service.entity";
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
  branchId: number;
  @ApiProperty()
  customerId: number;
}

export class CreateOrderDetailDTO {
  id: number = null;
  orderId: number = null;
  order: Order = null;
  service: Service = null;
  @ApiProperty()
  totalPrice: number;
  @ApiProperty()
  quantity: number;
  @ApiProperty()
  price: number;
  @ApiProperty({ required: false })
  description: string;
  @ApiProperty()
  serviceId: number;
  @ApiProperty({ enum: OrderEnum, default: OrderEnum.DRAFT })
  status: OrderEnum;
}
