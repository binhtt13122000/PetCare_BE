import { ApiProperty } from "@nestjs/swagger";
import { OrderEnum, PaymentOrderMethodEnum } from "src/enum";
import { OrderDetailDTO } from "./order-detail.dto";
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
  orderDetails: Partial<OrderDetailDTO[]>;
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
}
