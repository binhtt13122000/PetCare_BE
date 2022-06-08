import { ApiProperty } from "@nestjs/swagger";
import { CreateOrderDTO } from "./create-order.dto";
export class UpdateOrderDTO extends CreateOrderDTO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  promotionId: number;
  @ApiProperty()
  star: number;
  @ApiProperty()
  review: string;
  @ApiProperty({ required: false, isArray: true })
  deletedIds: number[];
}

export class OrderPaymentDTO extends UpdateOrderDTO {
  @ApiProperty()
  paymentPoint: number;
}
