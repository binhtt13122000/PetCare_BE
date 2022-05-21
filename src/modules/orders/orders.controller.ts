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
  HttpCode,
  NotFoundException,
  BadGatewayException,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { OrdersService } from "./orders.service";

import { UpdateOrderDTO } from "./dto/update-order.dto";
import { vnpayService } from "src/external/vnpay.service";
import { Request } from "express";
import { PaymentQuery } from "src/common";
import { Cache } from "cache-manager";
import { format } from "date-fns";
import { OrderEnum, PaymentOrderMethodEnum } from "src/enum";
import { ResponsePayment } from "./dto/response-payment.dto";
import { OrderOptionDto } from "./dto/order-option.dto";
import { PageDto } from "src/common/page.dto";
import { CreateOrderDTO } from "./dto/create-order.dto";
import { Order } from "src/entities/order_service/order.entity";
import { CustomerService } from "../customer/customer.service";

@ApiTags("orders")
@Controller("orders")
export class OrdersController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly ordersService: OrdersService,
    private readonly customerService: CustomerService,
  ) {}

  @Post()
  async create(@Body() body: CreateOrderDTO): Promise<Order> {
    try {
      return this.ordersService.store(body);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Put()
  async update(@Body() body: UpdateOrderDTO): Promise<Order> {
    try {
      const order = await this.ordersService.findById(body.id);
      if (!order) {
        throw new NotFoundException("Not found");
      }
      if (order.status === OrderEnum.SUCCESS) {
        throw new BadGatewayException("Cannot update");
      }
      const instance = await this.ordersService.findById(body.id);
      Object.assign(instance, body);
      return instance.save();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Post("payment")
  async deposit(
    @Req() req: Request,
    @Query() query: PaymentQuery,
    @Body() body: UpdateOrderDTO,
  ): Promise<ResponsePayment | Order> {
    try {
      const order = await this.ordersService.findById(body.id);
      if (!order) {
        throw new HttpException("not found", HttpStatus.NOT_FOUND);
      }
      if (order.status === OrderEnum.SUCCESS) {
        throw new HttpException("Paymented!", HttpStatus.NOT_FOUND);
      }
      switch (body.paymentMethod) {
        case PaymentOrderMethodEnum.VNPAY:
          const ipAddr: string = req.socket.remoteAddress;
          const url = vnpayService.generatePaymentUrl(
            format(new Date(), "yyyyMMddHHmmss") + body.id,
            query.returnUrl,
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
        case PaymentOrderMethodEnum.CASH:
          return await this.ordersService.update(body.id, {
            ...order,
            ...body,
            status: OrderEnum.SUCCESS,
          });
        default:
          break;
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
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
          const customer = await this.customerService.findById(
            updatedOrder.customerId,
          );
          if (!order) {
            throw new HttpException("not found", HttpStatus.NOT_FOUND);
          }
          if (!customer) {
            throw new HttpException("not found", HttpStatus.NOT_FOUND);
          }
          if (order.status === OrderEnum.SUCCESS) {
            throw new HttpException("Paymented!", HttpStatus.NOT_FOUND);
          }
          this.cacheManager.del("order_id_" + id);
          await this.ordersService.update(updatedOrder.id, {
            ...order,
            ...updatedOrder,
            status: OrderEnum.SUCCESS,
            payment: updatedOrder.orderTotal,
          });
          await this.customerService.update(customer.id, {
            ...customer,
            point: customer.point + updatedOrder.point,
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

  @Get()
  @HttpCode(HttpStatus.OK)
  async getOrderOfCustomer(
    @Query() orderOptionDto: OrderOptionDto,
  ): Promise<PageDto<Order>> {
    try {
      return await this.ordersService.fetchOrders(orderOptionDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
