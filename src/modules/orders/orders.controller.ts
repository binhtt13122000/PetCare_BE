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
  BreedingTransactionEnum,
  ComboTypeEnum,
  HealthPetRecordEnum,
  NotificationEnum,
  OrderEnum,
  OrderServiceType,
  OrderTypeCreated,
  PaymentOrderMethodEnum,
  ServiceType,
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
import { NotificationProducerService } from "src/shared/notification/notification.producer.service";
import { UserService } from "../users/user.service";
import { CancelDTO } from "./dto/cancel-order.dto";
import { ReviewDTO } from "./dto/review-order.dto";
import { ShopService } from "../services/services.service";
import { PetsService } from "../pets/pets.service";
import { HealthPetRecordsService } from "../health-pet-records/health-pet-records.service";
import { HttpService } from "@nestjs/axios";
import { HealthPetRecord } from "src/entities/pet_service/health-pet-record.entity";
import { map } from "rxjs";

@ApiTags("orders")
@Controller("orders")
export class OrdersController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly ordersService: OrdersService,
    private readonly accountService: UserService,
    private readonly customerService: CustomerService,
    private readonly orderDetailsService: OrderDetailsService,
    private readonly comboService: ComboServicesService,
    private readonly combos: CombosService,
    private readonly breedTransactionService: BreedTransactionService,
    private readonly petCombosService: PetCombosService,
    private readonly shopService: ShopService,
    private readonly petService: PetsService,
    private readonly petComboServicesService: PetComboServicesService,
    private readonly notificationProducerService: NotificationProducerService,
    private readonly healthPetRecordsService: HealthPetRecordsService,
    private readonly httpService: HttpService,
  ) {}

  @Get(":id")
  async getOne(@Param("id") id: number): Promise<Order> {
    return this.ordersService.getOne(id);
  }

  @Get("/breed-transaction/:id")
  async getOrderByBreedingTransactionId(
    @Param("id") id: number,
  ): Promise<number> {
    const breedTransactionExisted = await this.breedTransactionService.findById(
      id,
    );
    if (!breedTransactionExisted) {
      throw new NotFoundException("Not found breeding transaction by id!");
    }
    const orders = await this.ordersService.getOrdersByBreedingTransactionId(
      id,
    );
    if (!orders || orders.length === 0) {
      throw new NotFoundException(
        "Not found order by breeding transaction id!",
      );
    }
    return orders[0];
  }

  @Get("/pet-combo/:id")
  async getOrderByPetComboId(@Param("id") id: number): Promise<number> {
    const petComboExisted = await this.petCombosService.findById(id);
    if (!petComboExisted) {
      throw new NotFoundException("Not found pet combo by id!");
    }
    const orders = await this.ordersService.getOrdersByPetComboId(id);
    if (!orders || orders.length === 0) {
      throw new NotFoundException("Not found order by pet combo id!");
    }
    return orders[0];
  }

  @Post()
  async create(@Body() body: CreateOrderDTO): Promise<Order> {
    if (!body.orderDetails || body.orderDetails.length === 0) {
      throw new HttpException("Bad request!", HttpStatus.BAD_REQUEST);
    }
    try {
      const customerInstance = await this.customerService.findById(
        body.customerId,
      );
      if (!customerInstance) {
        throw new NotFoundException("Not found customer");
      }
      const accountCustomerInstance =
        await this.accountService.findByPhoneNumber(
          customerInstance.phoneNumber,
        );
      const orderList = await this.ordersService.getOrdersAvailableByCustomerId(
        customerInstance.id,
        OrderEnum.WAITING,
      );
      if (orderList && orderList.length > 0) {
        throw new NotFoundException(
          "Can not create new order! You have an unpaid order. Please pay before ordering another.",
        );
      }
      const filterOrderBreeding = body.orderDetails.filter(
        (item) => item.breedTransactionId,
      );
      if (filterOrderBreeding && filterOrderBreeding.length > 0) {
        filterOrderBreeding.map(async (item) => {
          const breedTransactionAvailable =
            await this.ordersService.getOrdersByBreedingTransactionId(
              item.breedTransactionId,
            );
          if (
            breedTransactionAvailable &&
            breedTransactionAvailable.length > 0
          ) {
            throw new BadRequestException(
              "Breeding Transaction have been existed another order!",
            );
          }
        });
      }
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
              totalPrice: combo.price,
              price: combo.price,
              petComboId: createPetCombo.id,
              quantity: 1,
            };
          }
          return item;
        }),
      );
      body.orderDetails = [...convertOrderDetails];
      const orderCreated = await this.ordersService.store(body);
      if (body.type && body.type === OrderTypeCreated.BRANCH) {
        await this.notificationProducerService.sendMessage(
          {
            body: "You have new order. See information details now.>>>>",
            title: `New Order With Order ID: ${orderCreated.id}`,
            type: NotificationEnum.NEW_ORDER,
            metadata: String(orderCreated.id),
          },
          accountCustomerInstance.id,
        );
      }
      return orderCreated;
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
      const customerInstance = await this.customerService.findById(
        body.customerId,
      );
      if (!customerInstance) {
        throw new NotFoundException("Not found customer");
      }
      const accountCustomerInstance =
        await this.accountService.findByPhoneNumber(
          customerInstance.phoneNumber,
        );
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
      if (orderDetails && orderDetails.length > 0) {
        const convertOrderDetails = await Promise.all(
          orderDetails.map(async (item) => {
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
                breedTransactionAvailable &&
                breedTransactionAvailable.length > 0
                  ? breedTransactionAvailable[0]
                  : "";
              const petCombo: Partial<PetCombo> = {
                registerTime: body.registerTime,
                isCompleted: false,
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
              return new OrderDetail({
                totalPrice: combo.price,
                price: combo.price,
                petComboId: createPetCombo.id,
                quantity: 1,
              });
            }
            const convertObject = new OrderDetail({
              price: item.price,
              quantity: item.quantity,
              serviceId: item.serviceId,
              totalPrice: item.totalPrice,
              breedTransactionId: item.breedTransactionId,
            });
            return convertObject;
          }),
        );
        instance.orderDetails.push(...convertOrderDetails);
      }

      Object.assign(order, rest);
      const totalPrice =
        instance && instance.orderDetails
          ? instance.orderDetails.reduce(
              (totalPrice, item) => totalPrice + item.totalPrice,
              0,
            )
          : instance.orderTotal;
      instance.orderTotal = totalPrice;
      instance.provisionalTotal = totalPrice;
      const updatedOrder = await instance.save();
      if (body.type && body.type === OrderTypeCreated.BRANCH) {
        await this.notificationProducerService.sendMessage(
          {
            body: "Your order have been updated. See information details now.>>>>",
            title: `Updated Order With Order ID: ${updatedOrder.id}`,
            type: NotificationEnum.UPDATE_ORDER,
            metadata: String(updatedOrder.id),
          },
          accountCustomerInstance.id,
        );
      }
      return updatedOrder;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Put("review")
  async review(@Body() body: ReviewDTO): Promise<Order> {
    const orderInstance = await this.ordersService.findById(body.id);
    if (!orderInstance) {
      throw new NotFoundException("Not found order by id!");
    }
    orderInstance.star = body.star;
    orderInstance.review = body.review || "";
    return orderInstance.save();
  }

  @Put("cancel")
  async cancel(@Body() body: CancelDTO): Promise<Order> {
    try {
      const orderExisted = await this.ordersService.findById(body.id);
      if (!orderExisted) {
        throw new NotFoundException("not found order!");
      }
      if (orderExisted.status !== OrderEnum.WAITING) {
        throw new BadRequestException("Can not change status order!");
      }
      return await this.ordersService.update(orderExisted.id, {
        ...orderExisted,
        reasonCancel: body.reasonCancel,
        cancelTime: body.cancelTime,
        status: OrderEnum.CANCELED,
      });
    } catch (error) {
      throw new BadRequestException(error);
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
          const orderList = await this.ordersService.getOneWithOrderDetails(
            rest.id,
          );
          const customer = await this.customerService.findById(rest.customerId);
          if (!order) {
            throw new HttpException("not found", HttpStatus.NOT_FOUND);
          }
          if (!orderList) {
            throw new HttpException("not found", HttpStatus.NOT_FOUND);
          }
          if (!customer) {
            throw new HttpException("not found", HttpStatus.NOT_FOUND);
          }
          if (order.status === OrderEnum.SUCCESS) {
            throw new HttpException("Paymented!", HttpStatus.NOT_FOUND);
          }
          await Promise.all(
            orderList.orderDetails.map(async (item) => {
              if (item.breedTransactionId) {
                const findBreedTransaction =
                  await this.breedTransactionService.findById(
                    item.breedTransactionId,
                  );
                if (findBreedTransaction) {
                  findBreedTransaction.status =
                    BreedingTransactionEnum.BREEDING_SUCCESS;
                  await findBreedTransaction.save();
                }
              } else if (item.petComboId) {
                const findPetCombo = await this.petCombosService.findById(
                  item.petComboId,
                );
                if (findPetCombo) {
                  findPetCombo.isDraft = false;
                  findPetCombo.save();
                }
              } else if (item.petId) {
                const findService = await this.shopService.findById(
                  item.serviceId,
                );
                if (findService && findService.type !== ServiceType.NORMAL) {
                  let petInstance;
                  if (findService.type === ServiceType.MICROCHIP) {
                    petInstance = await this.petService.findById(item.petId);
                  } else {
                    petInstance = await this.petService.getOne(
                      item.petId,
                      true,
                    );
                  }
                  if (petInstance) {
                    if (
                      findService.type === ServiceType.MICROCHIP &&
                      item.microchip
                    ) {
                      petInstance.specialMarkings = item.microchip;
                      petInstance.save();
                    } else {
                      let healthPetRecordType;
                      switch (findService.type) {
                        case ServiceType.VACCINE:
                          healthPetRecordType = HealthPetRecordEnum.VACCINE;
                          break;
                        case ServiceType.HELMINTHIC:
                          healthPetRecordType = HealthPetRecordEnum.HELMINTHIC;
                          break;
                        case ServiceType.TICKS:
                          healthPetRecordType = HealthPetRecordEnum.TICKS;
                          break;
                        default:
                          break;
                      }
                      if (healthPetRecordType) {
                        const healthPetRecord = {
                          type: healthPetRecordType,
                          dateOfInjection: updatedOrder.registerTime,
                          petId: petInstance.id,
                          branchId: updatedOrder.branchId,
                        };
                        if (findService.type === ServiceType.VACCINE) {
                          await this.healthPetRecordsService.store(
                            new HealthPetRecord({
                              ...healthPetRecord,
                              vaccineType: findService.name,
                              vaccineId: findService.vaccineId,
                            }),
                          );
                        } else {
                          await this.healthPetRecordsService.store(
                            new HealthPetRecord({
                              ...healthPetRecord,
                            }),
                          );
                        }

                        if (petInstance.specialMarkings) {
                          let script = "";
                          if (findService.type === ServiceType.VACCINE) {
                            script = "The dog has been given a new vaccine";
                          } else if (
                            findService.type === ServiceType.HELMINTHIC
                          ) {
                            script = "The dog has been given a new deworming";
                          } else if (findService.type === ServiceType.TICKS) {
                            script =
                              "The dog has been given a new tick treatment";
                          }
                          await this.httpService
                            .post("/api/setData", {
                              no: petInstance.specialMarkings,
                              content: {
                                current: petInstance,
                                write: script,
                              },
                              type: "UPDATE",
                              date: updatedOrder.registerTime,
                            })
                            .pipe(map((response) => response.data));
                        }
                      }
                    }
                  }
                }
              }
            }),
          );
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
