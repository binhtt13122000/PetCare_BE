import { ApiProperty } from "@nestjs/swagger";
import { OrderDetail } from "src/entities/order_service/order-detail.entity";
import {
  OrderEnum,
  OrderType,
  OrderTypeCreated,
  PaymentOrderMethodEnum,
} from "src/enum";
export class CreateOrderDTO {
  @ApiProperty()
  provisionalTotal: number;
  @ApiProperty()
  orderTotal: number;
  @ApiProperty({ enum: OrderEnum, default: OrderEnum.DRAFT })
  status: OrderEnum;
  @ApiProperty({ required: false })
  description: string;
  @ApiProperty()
  orderDetails: Partial<
    Partial<
      OrderDetail & {
        petId?: number;
        microchip?: string;
        registerTime?: Date;
        serviceType?: string;
      }
    >[]
  >;
  @ApiProperty()
  branchId: number;
  @ApiProperty()
  customerId: number;
  @ApiProperty()
  point: number;
  @ApiProperty({ required: false })
  paymentTime: Date;
  @ApiProperty({ required: false })
  paymentMethod: PaymentOrderMethodEnum;
  @ApiProperty({ required: false })
  payment?: number;
  @ApiProperty()
  registerTime: Date;
  @ApiProperty({ required: false, default: OrderTypeCreated.NORMAL })
  type?: OrderTypeCreated;
}
