import { OmitType, ApiProperty } from "@nestjs/swagger";
import { CreateOrderDTO } from "./create-order.dto";
import { Service } from "src/entities/service/service.entity";
import { Order } from "src/entities/order_service/order.entity";
import { PaymentOrderMethodEnum } from "src/enum";
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
  paymentMethod: PaymentOrderMethodEnum;
  @ApiProperty()
  promotionId: number;
  @ApiProperty({ required: false })
  payment?: number;
  @ApiProperty()
  point: number;
}

export class UpdateOrderDetailDTO {
  @ApiProperty()
  id: number;
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
}
