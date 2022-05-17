import {
  Controller,
  Post,
  Body,
  Put,
  HttpException,
  HttpStatus,
  Get,
  Req,
  Query,
  Inject,
  CACHE_MANAGER,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { OrdersService } from "./orders.service";
import { CreateOrderDTO } from "./dto/create-order.dto";
import { Order } from "src/entities/order_service/order.entity";
import { UpdateOrderDTO } from "./dto/update-order.dto";
import { configService } from "src/config/config.service";
import { vnpayService } from "src/external/vnpay.service";
import { Request } from "express";
import { PaymentQuery } from "src/common";
import { Cache } from "cache-manager";
import { format } from "date-fns";
import { OrderEnum } from "src/enum";
import { ResponsePayment } from "./dto/response-payment.dto";

@ApiTags("orders")
@Controller("orders")
export class OrdersController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly ordersService: OrdersService,
  ) {}

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

  @Post("payment")
  async deposit(
    @Req() req: Request,
    @Query() query: PaymentQuery,
    @Body() body: UpdateOrderDTO,
  ): Promise<ResponsePayment> {
    try {
      const order = await this.ordersService.findById(body.id);
      if (!order) {
        throw new HttpException("not found", HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
    if (!query.paymentMethod) {
      query.paymentMethod = "vnpay";
    }
    switch (query.paymentMethod) {
      case "vnpay":
        const ipAddr: string = req.socket.remoteAddress;
        const returnUrl =
          configService.getApiRootURL() + "/v1/api/orders/vnpay_return";
        const url = vnpayService.generatePaymentUrl(
          format(new Date(), "yyyyMMddHHmmss") + body.id,
          returnUrl,
          body.orderTotal,
          ipAddr.split(":").pop() || "127.0.0.1",
          query.message,
          query.locale,
          "NCB",
          undefined,
        );
        if (url) {
          this.cacheManager.set("order_id_" + body.id, JSON.stringify(body), {
            ttl: 300,
          });
          return { url };
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
      async () => {
        const vnp_Params = req.query;
        const vnp_TxnRef = String(vnp_Params["vnp_TxnRef"]);
        const id = vnp_TxnRef.slice(14);
        const updateOrderJSON: string = await this.cacheManager.get(
          "order_id_" + id,
        );
        const updatedOrder: UpdateOrderDTO = JSON.parse(updateOrderJSON);
        try {
          const order = await this.ordersService.findById(updatedOrder.id);
          if (!order) {
            throw new HttpException("not found", HttpStatus.NOT_FOUND);
          }
          this.cacheManager.del("order_id_" + id);
          await this.ordersService.update(updatedOrder.id, {
            ...order,
            ...updatedOrder,
            status: OrderEnum.SUCCESS,
          });
        } catch (error) {
          throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
      },
      () => {
        // eslint-disable-next-line no-console
        console.log("Payment Failed");
        // this.cacheManager.del("order_id_" + id);
      },
    );
  }
}
