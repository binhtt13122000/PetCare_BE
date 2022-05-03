import { OmitType, ApiProperty } from "@nestjs/swagger";
import { CreateOrderDTO } from "./create-order.dto";
import { Service } from "src/entities/service/service.entity";
import { Order } from "src/entities/order_service/order.entity";
export class UpdateOrderDTO extends OmitType(CreateOrderDTO, [
  "orderDetails",
] as const) {
  @ApiProperty()
  id: number;
  @ApiProperty()
  orderDetails: UpdateOrderDetailDTO[];
  @ApiProperty()
  paymentTime: Date;
  @ApiProperty()
  paymentMethod: string;
  @ApiProperty()
  promotionId: number;
}

export class UpdateOrderDetailDTO {
  @ApiProperty()
  id: number;
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
