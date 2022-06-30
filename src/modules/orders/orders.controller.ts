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
  Param,
  BadRequestException,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { OrdersService } from "./orders.service";

import { UpdateOrderDTO, OrderPaymentDTO } from "./dto/update-order.dto";
import { vnpayService } from "src/external/vnpay.service";
import { Request } from "express";
import { PaymentQuery } from "src/common";
import { Cache } from "cache-manager";
import { format } from "date-fns";
import {
  ComboTypeEnum,
  OrderEnum,
  OrderServiceType,
  PaymentOrderMethodEnum,
} from "src/enum";
import { ResponsePayment } from "./dto/response-payment.dto";
import { OrderOptionDto } from "./dto/order-option.dto";
import { PageDto } from "src/common/page.dto";
import { CreateOrderDTO } from "./dto/create-order.dto";
import { Order } from "src/entities/order_service/order.entity";
import { CustomerService } from "../customer/customer.service";
import { OrderDetail } from "src/entities/order_service/order-detail.entity";
import { OrderDetailsService } from "../order-details/order-details.service";
import { ComboServicesService } from "../combo-services/combo-services.service";
import { CombosService } from "../combos/combos.service";
import { Combo } from "src/entities/service/combo.entity";
import { ComboService } from "src/entities/service/combo-service.entity";
import { PetCombo } from "src/entities/pet_service/pet-combo.entity";
import { BreedTransactionService } from "../breed-transaction/breed-transaction.service";
import { PetCombosService } from "../pet-combo/pet-combo.service";
import { PetComboServicesService } from "../pet-combo-services/pet-combo-services.service";
import { OrderDetailDTO } from "./dto/order-detail.dto";
import { EntityId } from "typeorm/repository/EntityId";

@ApiTags("orders")
@Controller("orders")
export class OrdersController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly ordersService: OrdersService,
    private readonly customerService: CustomerService,
    private readonly orderDetailsService: OrderDetailsService,
    private readonly comboService: ComboServicesService,
    private readonly combos: CombosService,
    private readonly breedTransactionService: BreedTransactionService,
    private readonly petCombosService: PetCombosService,
    private readonly petComboServicesService: PetComboServicesService,
  ) {}

  @Get(":id")
  async getOne(@Param("id") id: number): Promise<Order> {
    return this.ordersService.getOne(id);
  }

  @Post()
  async create(@Body() body: CreateOrderDTO): Promise<Order> {
    if (!body.orderDetails || body.orderDetails.length === 0) {
      throw new HttpException("Bad request!", HttpStatus.BAD_REQUEST);
    }
    try {
      const convertOrderDetails = await Promise.all(
        body.orderDetails.map(async (item) => {
          if (item.petComboId) {
            if (!item.registerTime) {
              throw new HttpException(
                "Required register time for combo!",
                HttpStatus.BAD_REQUEST,
              );
            }
            let next = 0;
            const combo: Partial<Combo> = await this.combos.findById(
              item.petComboId,
            );
            const comboService: Partial<ComboService[]> =
              await this.comboService.findComboServiceByComboId(
                item.petComboId,
              );
            const breedTransactionAvailable =
              await this.breedTransactionService.getBreedingTransactionAvailableByPetId(
                item.petId,
              );
            const breedTransaction =
              breedTransactionAvailable && breedTransactionAvailable.length > 0
                ? breedTransactionAvailable[0]
                : "";
            const petCombo: Partial<PetCombo> = {
              registerTime: body.registerTime,
              isCompleted: false,
              paymentMethod: body.paymentMethod,
              orderTotal: combo.price,
              point: body.point,
              petId: item.petId,
              branchId: body.branchId,
              comboId: item.petComboId,
              breedingTransactionId:
                combo.type === ComboTypeEnum.BREED && breedTransaction
                  ? breedTransaction.id
                  : null,
            };

            const createPetCombo = await this.petCombosService.store({
              ...petCombo,
              isDraft: true,
            });
            comboService.forEach(async (itemComboService, index) => {
              next += itemComboService.nextEvent;

              const ts = new Date(item.registerTime);
              ts.setDate(ts.getDate() + next);
              if (index == 0) {
                await this.petComboServicesService.store({
                  workingTime: item.registerTime,
                  isCompleted: false,
                  serviceId: itemComboService.serviceId,
                  petComboId: createPetCombo.id,
                  priority: itemComboService.priority,
                  realTime: undefined,
                });
              } else {
                await this.petComboServicesService.store({
                  workingTime: ts,
                  isCompleted: false,
                  serviceId: itemComboService.serviceId,
                  petComboId: createPetCombo.id,
                  priority: itemComboService.priority,
                  realTime: undefined,
                });
              }
            });
            return {
              totalPrice: createPetCombo.orderTotal,
              price: 0,
              petComboId: createPetCombo.id,
              quantity: 1,
            };
          }
          return item;
        }),
      );
      body.orderDetails = [...convertOrderDetails];
      return this.ordersService.store(body);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Put()
  async update(@Body() body: UpdateOrderDTO): Promise<Order> {
    try {
      const { deletedIds, orderDetails, ...rest } = body;
      const order = await this.ordersService.findById(rest.id);
      if (!order) {
        throw new NotFoundException("Not found");
      }
      if (order.status === OrderEnum.SUCCESS) {
        throw new BadGatewayException("Cannot update");
      }
      if (deletedIds && deletedIds.length > 0) {
        const convertDeletedIds = deletedIds.map((item) => item.id);
        await this.orderDetailsService.deleteItems(convertDeletedIds);
        const convertDeletedIdsCombo = deletedIds
          .filter(
            (item) => item.type === OrderServiceType.COMBO && item.petComboId,
          )
          .map((item) => item.petComboId);
        if (convertDeletedIdsCombo && convertDeletedIdsCombo.length > 0) {
          const petComboServiceIds =
            await this.petComboServicesService.getPetComboServicesByPetCombIds(
              convertDeletedIdsCombo,
            );
          if (petComboServiceIds && petComboServiceIds.length > 0) {
            const deletedIds = petComboServiceIds.map((item) => item.id);
            await this.petComboServicesService.deleteItems(deletedIds);
          }
          await this.petCombosService.deleteItems(convertDeletedIdsCombo);
        }
      }
      const instance = await this.ordersService.getOneWithOrderDetails(rest.id);
      instance.orderDetails;
      if (instance?.orderDetails) {
        instance.orderDetails = instance.orderDetails.map((item) => {
          const findIndex = orderDetails.findIndex(
            (itemOrderService) =>
              itemOrderService?.id && item.id === itemOrderService.id,
          );
          if (findIndex !== -1) {
            item.price = orderDetails[findIndex].price;
            item.quantity = orderDetails[findIndex].quantity;
            item.serviceId = orderDetails[findIndex].serviceId;
            item.totalPrice = orderDetails[findIndex].totalPrice;
            orderDetails.splice(findIndex, 1);
          }
          return item;
        });
      }
      orderDetails &&
        orderDetails.length > 0 &&
        orderDetails.forEach((item) => {
          const convertObject = new OrderDetail({
            price: item.price,
            quantity: item.quantity,
            serviceId: item.serviceId,
            totalPrice: item.totalPrice,
          });
          instance.orderDetails.push(convertObject);
        });
      Object.assign(order, rest);
      const totalPrice =
        instance && instance.orderDetails
          ? instance.orderDetails.reduce(
              (totalPrice, item) => totalPrice + item.totalPrice,
              0,
            )
          : instance.orderTotal;
      order.orderTotal = totalPrice;
      order.provisionalTotal = totalPrice;
      return instance.save();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Post("payment")
  async deposit(
    @Req() req: Request,
    @Query() query: PaymentQuery,
    @Body() body: OrderPaymentDTO,
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
              ttl: 600,
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

  @Get("vnpay/vnpay_return")
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
        const updatedOrder: OrderPaymentDTO = JSON.parse(updateOrderJSON);
        const { paymentPoint, ...rest } = updatedOrder;
        try {
          const order = await this.ordersService.findById(rest.id);
          const customer = await this.customerService.findById(rest.customerId);
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
            ...rest,
            status: OrderEnum.SUCCESS,
            payment: updatedOrder.orderTotal,
          });
          await this.customerService.update(customer.id, {
            ...customer,
            point: customer.point + updatedOrder.point - paymentPoint,
          });
        } catch (error) {
          throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
      },
      () => {
        throw new BadRequestException("USER_CANCEL_REQUEST");
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
