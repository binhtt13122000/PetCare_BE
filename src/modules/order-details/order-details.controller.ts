import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { IdParams } from "src/common";
import { PageDto } from "src/common/page.dto";
import { OrderDetail } from "src/entities/order_service/order-detail.entity";
import { OrdersService } from "../orders/orders.service";
import { OrderDetailOptionDto } from "./dto/order-detail-option.dto";
import { OrderDetailsService } from "./order-details.service";
import { NotFoundException } from "@nestjs/common";
import { DeleteResult } from "typeorm";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";

@Controller("order-details")
@ApiTags("order-details")
@UseGuards(JwtAuthGuard, RolesGuard)
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

  @Delete()
  async delete(@Param() params: IdParams): Promise<boolean> {
    try {
      const orderDetail = await this.orderDetailsService.findById(params.id);
      if (!orderDetail) {
        throw new NotFoundException("not found");
      }
      const deleteResult: DeleteResult = await this.orderDetailsService.delete(
        params.id,
      );

      return deleteResult.affected && deleteResult.affected > 0;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
