import { ApiProperty } from "@nestjs/swagger";
import { Order } from "src/entities/order_service/order.entity";
import { Service } from "src/entities/service/service.entity";
import { BaseEntity } from "typeorm";
export class OrderDetailDTO extends BaseEntity {
  @ApiProperty({ required: false })
  id?: number;
  @ApiProperty()
  totalPrice: number;
  @ApiProperty()
  quantity: number;
  @ApiProperty()
  price: number;
  @ApiProperty({ required: false })
  description: string;
  @ApiProperty({ required: false })
  orderId?: number;
  order: Order = null;
  @ApiProperty()
  serviceId: number;
  service: Service = null;
}
