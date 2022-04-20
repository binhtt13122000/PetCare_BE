import {
  Controller,
  Post,
  Body,
  Put,
  HttpException,
  HttpStatus,
  Get,
  Res,
  Req,
  Param,
  Query,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { OrdersService } from "./orders.service";
import { CreateOrderDTO } from "./dto/create-order.dto";
import { Order } from "src/entities/order_service/order.entity";
import { UpdateOrderDTO } from "./dto/update-order.dto";
import { configService } from "src/config/config.service";
import { vnpayService } from "src/external/vnpay.service";
import { Request, Response } from "express";
import { IdParams, PaymentQuery } from "src/common/type";

@ApiTags("orders")
@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() body: CreateOrderDTO): Promise<Order> {
    try {
      return this.ordersService.store(new Order(body));
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Put()
  async update(@Body() body: UpdateOrderDTO): Promise<Order> {
    try {
      return await this.ordersService.update(body.id, body);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get("payment/:id")
  deposit(
    @Res() res: Response,
    @Req() req: Request,
    @Query() query: PaymentQuery,
    @Param() param: IdParams,
  ): void {
    if (!query.paymentMethod) {
      query.paymentMethod = "vnpay";
    }
    switch (query.paymentMethod) {
      case "vnpay":
        const ipAddr: string = req.socket.remoteAddress;
        const returnUrl =
          configService.getApiRootURL() + "v1/api/order/vnpay_return";
        const url = vnpayService.generatePaymentUrl(
          String(param.id),
          returnUrl,
          query.total,
          ipAddr.split(":").pop() || "127.0.0.1",
          query.message,
          query.locale,
          "NCB",
          undefined,
        );
        if (url) {
          return res.redirect(url);
        }
        break;
      case "momo":
        break;
      default:
        break;
    }
  }

  @Get("vnpay_return")
  vnPayReturn(@Req() req: Request): void {
    vnpayService.vnpayReturn(
      req,
      () => {
        // eslint-disable-next-line no-console
        console.log(req);
      },
      () => {
        // eslint-disable-next-line no-console
        console.log("Payment Failed");
      },
    );
  }
}
