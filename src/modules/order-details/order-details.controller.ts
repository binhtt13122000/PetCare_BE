import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PageDto } from "src/common/page.dto";
import { OrderDetail } from "src/entities/order_service/order-detail.entity";
import { OrdersService } from "../orders/orders.service";
import { OrderDetailOptionDto } from "./dto/order-detail-option.dto";
import { OrderDetailsService } from "./order-details.service";

@Controller("order-details")
@ApiTags("order-details")
export class OrderDetailsController {
  constructor(
    private readonly orderDetailsService: OrderDetailsService,
    private orderService: OrdersService,
  ) {}

  @Get()
  async getOrderDetail(
    @Query() pageOptionsDto: OrderDetailOptionDto,
  ): Promise<PageDto<OrderDetail>> {
    try {
      const order = await this.orderService.findById(pageOptionsDto.orderId);
      if (order.promotionId) {
        return await this.orderDetailsService.fetchOrderDetail(
          pageOptionsDto,
          true,
        );
      } else {
        return await this.orderDetailsService.fetchOrderDetail(
          pageOptionsDto,
          false,
        );
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
