import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
  NotFoundException,
  Put,
  Req,
  Query,
  Inject,
  CACHE_MANAGER,
  Get,
  Param,
  BadRequestException,
  UseGuards,
} from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { SaleTransaction } from "src/entities/transaction_service/sale-transaction.entity";
import { CreateSaleTransactionDTO } from "./dtos/create-sale-transaction.dto";
import { SaleTransactionsService } from "./sale-transactions.service";
import { UpdateSaleTransactionDTO } from "./dtos/update-sale-transaction.dto";
import { PaymentQuery } from "src/common";
import { ResponsePayment } from "../orders/dto/response-payment.dto";
import {
  NotificationEnum,
  PaymentOrderMethodEnum,
  PetEnum,
  PostEnum,
  RoomStatusEnum,
  SaleTransactionEnum,
  TicketStatusEnum,
} from "src/enum";
import { Request } from "express";
import { vnpayService } from "src/external/vnpay.service";
import { format } from "date-fns";
import { Cache } from "cache-manager";
import { CustomerService } from "../customer/customer.service";
import { SaleTransactionPayment } from "./dtos/payment.dto";
import { PostsService } from "../posts/posts.service";
import { ChatGateway } from "../chat/chat.gateway";
import { RoomsService } from "../rooms/rooms.service";
import { MessagesService } from "../messages/messages.service";
import { MessageEnum } from "src/schemas/message.schema";
import { PetOwnerService } from "../pet-owner/pet-owner.service";
import { PetOwner } from "src/entities/pet_service/pet-owner.entity";
import { PetsService } from "../pets/pets.service";
import { UserService } from "../users/user.service";
import { NotificationProducerService } from "src/shared/notification/notification.producer.service";
import { getSpecificDateAgoWithNumberDays } from "src/common/utils";
import { ResponseSaleTransaction } from "./dtos/response-sale-transaction.dto";
import { AxiosService } from "src/shared/axios/axios.service";
import { RolesGuard } from "../auth/guards/roles.guard";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { TicketsService } from "../tickets/tickets.service";

@Controller("sale-transactions")
@ApiTags("sale-transactions")
export class SaleTransactionsController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly saleTransactionsService: SaleTransactionsService,
    private readonly customerService: CustomerService,
    private readonly postService: PostsService,
    private readonly chatGateway: ChatGateway,
    private readonly roomService: RoomsService,
    private readonly messageService: MessagesService,
    private readonly petOwnerService: PetOwnerService,
    private readonly petsService: PetsService,
    private readonly userService: UserService,
    private readonly ticketService: TicketsService,
    private readonly notificationProducerService: NotificationProducerService,
    private readonly axiosService: AxiosService,
  ) {}

  @Get()
  @ApiQuery({
    name: "buyerId",
    required: false,
    type: String,
  })
  @ApiQuery({
    name: "sellerId",
    required: false,
    type: String,
  })
  async getAll(
    @Query("buyerId") buyerId: string,
    @Query("sellerId") sellerId: string,
    @Query("page") page: string,
    @Query("limit") limit: string,
  ): Promise<SaleTransaction[]> {
    if (buyerId) {
      return await this.saleTransactionsService.getSaleTransactionsByBuyerId(
        Number(buyerId),
        limit ? Number(limit) : 10,
        page ? Number(page) : 1,
      );
    }
    if (sellerId) {
      return await this.saleTransactionsService.getSaleTransactionsBySellerId(
        Number(sellerId),
        limit ? Number(limit) : 10,
        page ? Number(page) : 1,
      );
    }
    return await this.saleTransactionsService.index();
  }

  @Get("test-cronjob")
  async getCheckExpiredSaleTransaction(): Promise<SaleTransaction[]> {
    const DAYS = 3;
    const dateWithThreeDaysAgo = getSpecificDateAgoWithNumberDays(DAYS);
    const saleTransactionList =
      await this.saleTransactionsService.getSaleTransactionAvailableInSpecificDate(
        dateWithThreeDaysAgo.toDateString(),
      );
    return saleTransactionList;
  }

  @Get(":id")
  async getOne(@Param("id") id: number): Promise<SaleTransaction> {
    return await this.saleTransactionsService.getOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() body: CreateSaleTransactionDTO): Promise<
    | ResponseSaleTransaction
    | {
        isSuccess: boolean;
      }
  > {
    try {
      const post = await this.postService.findById(body.postId);
      if (!post) {
        throw new NotFoundException("dont have post");
      }
      const checkExistedSaleTransactionWithPostId =
        await this.saleTransactionsService.checkExistedSaleTransactionAvailableWithPostId(
          body.postId,
        );
      if (checkExistedSaleTransactionWithPostId > 0) {
        return {
          isSuccess: false,
        };
      }
      post.status = PostEnum.WAITING_FOR_PAYMENT;
      await this.postService.update(post.id, post);
      const createdSaleTransaction = await this.saleTransactionsService.store(
        new SaleTransaction(body),
      );
      return {
        ...createdSaleTransaction,
        isSuccess: true,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put()
  async update(
    @Body() body: UpdateSaleTransactionDTO,
  ): Promise<SaleTransaction> {
    try {
      const currentSaleTransaction =
        await this.saleTransactionsService.findById(body.id);
      if (!currentSaleTransaction) {
        throw new NotFoundException("Cannot found");
      }
      const { message, ...rest } = body;
      const customerInstance = await this.customerService.findById(
        currentSaleTransaction.sellerId,
      );
      if (!customerInstance) {
        throw new NotFoundException("Not found customer");
      }
      const accountCustomerInstance = await this.userService.findByPhoneNumber(
        customerInstance.phoneNumber,
      );
      if (message) {
        const post = await this.postService.findById(
          currentSaleTransaction.postId,
        );
        if (!post) {
          throw new HttpException("not found post", HttpStatus.BAD_REQUEST);
        }
        await this.postService.update(post.id, {
          ...post,
          status: PostEnum.PUBLISHED,
        });
        const room = await this.roomService.findByBuyerAndPost(
          currentSaleTransaction.buyerId,
          currentSaleTransaction.postId,
        );
        if (!room) {
          throw new HttpException("not found", HttpStatus.NOT_FOUND);
        }
        room.status = RoomStatusEnum.CLOSED;
        room.newestMessage = message;
        room.newestMessageTime = rest.cancelTime;
        room.isSellerMessage = false;
        const updatedRoom = await this.roomService.updateRoom(room);
        const createdMessage = await this.messageService.create({
          content: message,
          createdTime: rest.cancelTime,
          isSellerMessage: false,
          type: MessageEnum.NORMAL,
          room: room._id,
        });
        this.chatGateway.server
          .in(room._id.valueOf())
          .emit("updatedRoom", updatedRoom);
        this.chatGateway.server
          .in(room._id.valueOf())
          .emit("chatToClient", createdMessage);
      }
      const updatedSaleTransaction = await this.saleTransactionsService.update(
        body.id,
        {
          ...currentSaleTransaction,
          ...rest,
        },
      );
      if (rest.status && rest.status === SaleTransactionEnum.CANCELED) {
        await this.notificationProducerService.sendMessage(
          {
            body: "Buyer have been canceled your sale transaction. See information details now.>>>>",
            title: `Sale Transaction #${updatedSaleTransaction.id} Canceled`,
            type: NotificationEnum.CANCELED_SALE_TRANSACTION,
            metadata: String(updatedSaleTransaction.id),
          },
          accountCustomerInstance.id,
        );
      }
      return updatedSaleTransaction;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post("payment")
  async deposit(
    @Req() req: Request,
    @Query() query: PaymentQuery,
    @Body() body: SaleTransactionPayment,
  ): Promise<ResponsePayment> {
    try {
      const saleTransaction = await this.saleTransactionsService.findById(
        body.id,
      );
      if (!saleTransaction) {
        throw new HttpException("not found", HttpStatus.NOT_FOUND);
      }
      if (saleTransaction.status !== SaleTransactionEnum.CREATED) {
        throw new HttpException("status error", HttpStatus.BAD_REQUEST);
      }
      switch (body.paymentMethod) {
        case PaymentOrderMethodEnum.VNPAY:
          const ipAddr: string = req.socket.remoteAddress;
          const url = vnpayService.generatePaymentUrl(
            format(new Date(), "yyyyMMddHHmmss") + body.id,
            query.returnUrl,
            body.transactionTotal,
            ipAddr.split(":").pop() || "127.0.0.1",
            query.message,
            query.locale,
            "NCB",
            undefined,
          );
          if (url) {
            this.cacheManager.set(
              "sale_transaction_id_" + body.id,
              JSON.stringify(body),
              {
                ttl: 600,
              },
            );
            return { url };
          }
          break;
        default:
          break;
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post("quick-payment")
  async quickPayment(@Body() body: SaleTransactionPayment): Promise<string> {
    try {
      const saleTransaction = await this.saleTransactionsService.findById(
        body.id,
      );
      if (!saleTransaction) {
        throw new HttpException("not found", HttpStatus.NOT_FOUND);
      }
      if (saleTransaction.status !== SaleTransactionEnum.CREATED) {
        throw new HttpException("status error", HttpStatus.BAD_REQUEST);
      }
      switch (body.paymentMethod) {
        case PaymentOrderMethodEnum.VNPAY:
          try {
            const saleTransaction = await this.saleTransactionsService.findById(
              body.id,
            );
            if (!saleTransaction) {
              throw new HttpException("not found", HttpStatus.NOT_FOUND);
            }
            const buyer = await this.customerService.findById(
              saleTransaction.buyerId,
            );
            const seller = await this.customerService.findById(
              saleTransaction.sellerId,
            );
            const pet = await this.petsService.findById(saleTransaction.petId);
            const post = await this.postService.findById(
              saleTransaction.postId,
            );
            if (!buyer) {
              throw new HttpException("not found", HttpStatus.NOT_FOUND);
            }
            if (!seller) {
              throw new HttpException("not found", HttpStatus.NOT_FOUND);
            }
            const accountSellerInstance =
              await this.userService.findByPhoneNumber(
                seller.phoneNumber || "",
              );
            if (saleTransaction.status !== SaleTransactionEnum.CREATED) {
              throw new HttpException("status error", HttpStatus.BAD_REQUEST);
            }
            if (!pet) {
              throw new HttpException("not found pet", HttpStatus.BAD_REQUEST);
            }
            if (!post) {
              throw new HttpException("not found post", HttpStatus.BAD_REQUEST);
            }
            const ticketOwnerSeller =
              await this.ticketService.getTicketsByUserId(seller.id);
            const {
              message,
              transactionTotal,
              paymentMethod,
              ...updateSaleTransaction
            } = body;
            const checkExistedPetName =
              await this.petsService.checkIsExistPetNameWithCustomerId(
                pet.name,
                saleTransaction.buyerId,
              );
            if (checkExistedPetName) {
              const petsBuyer = await this.petsService.getPetListByCustomerId(
                buyer.id,
              );
              let namePet = `${pet.name}-1`;
              if (petsBuyer && petsBuyer.length > 0) {
                let maxNumber = 1;
                petsBuyer.some((item) => {
                  if (
                    item.name
                      .trim()
                      .toLowerCase()
                      .startsWith(`${pet.name.trim().toLowerCase()}-`)
                  ) {
                    const split = item.name.split("-");
                    const testMatch = split[split.length - 1].match(/^\d+$/);
                    if (testMatch != null) {
                      const convertNumber = Number(split[split.length - 1]);
                      if (convertNumber > maxNumber) {
                        maxNumber = convertNumber;
                        namePet = `${pet.name}-${convertNumber + 1}`;
                      }
                    }
                  }
                });
              }
              pet.name = namePet;
            }
            await this.saleTransactionsService.update(body.id, {
              ...saleTransaction,
              ...updateSaleTransaction,
              status: SaleTransactionEnum.SUCCESS,
            });
            await this.petsService.update(pet.id, {
              ...pet,
              status: PetEnum.NORMAL,
            });
            await this.postService.update(post.id, {
              ...post,
              status: PostEnum.CLOSED,
            });
            await this.customerService.update(buyer.id, {
              ...buyer,
              point: buyer.point + body.point,
            });
            await this.customerService.update(seller.id, {
              ...seller,
              point: seller.point + body.point,
            });
            const roomList = await this.roomService.findAllRoomAvailableByPost(
              saleTransaction.postId,
            );
            if (roomList && roomList.length > 0) {
              await Promise.all(
                roomList.map(async (item) => {
                  item.status = RoomStatusEnum.CLOSED;
                  item.newestMessage =
                    item.buyerId === saleTransaction.buyerId
                      ? message
                      : "We sincerely apologize. The post has made the transaction. We hope to receive your understanding and look forward to continuing to serve you in future transactions.";
                  item.newestMessageTime = body.transactionTime;
                  item.isSellerMessage = true;
                  const updatedRoom = await this.roomService.updateRoom(item);
                  const createdMessage = await this.messageService.create({
                    content:
                      item.buyerId === saleTransaction.buyerId
                        ? message
                        : "We sincerely apologize. The post has made the transaction. We hope to receive your understanding and look forward to continuing to serve you in future transactions.",
                    createdTime: body.transactionTime,
                    isSellerMessage: true,
                    type: MessageEnum.NORMAL,
                    room: item._id,
                  });
                  this.chatGateway.server
                    .in(item._id.valueOf())
                    .emit("updatedRoom", updatedRoom);
                  this.chatGateway.server
                    .in(item._id.valueOf())
                    .emit("chatToClient", createdMessage);
                }),
              );
            }
            this.petOwnerService.updateAllByPetId(saleTransaction.petId);
            this.petOwnerService.store(
              new PetOwner({
                customerId: saleTransaction.buyerId,
                isCurrentOwner: true,
                petId: saleTransaction.petId,
                date: body.transactionTime,
              }),
            );
            await this.notificationProducerService.sendMessage(
              {
                body: "Buyer has successfully paid. See information details now.>>>>",
                title: "Successful Sale Transaction.",
                type: NotificationEnum.SUCCESS_SALE_TRANSACTION,
                metadata: String(saleTransaction.id),
              },
              accountSellerInstance.id,
            );

            if (pet.specialMarkings) {
              const fullDataPet = await this.petsService.getOne(pet.id, true);
              await this.axiosService.setData(
                fullDataPet,
                "CHANGE_OWNER",
                "The pet has new owner.",
                pet.specialMarkings,
              );
            }
            if (ticketOwnerSeller) {
              ticketOwnerSeller.status = TicketStatusEnum.CANCELED;
              ticketOwnerSeller.save();
            }
            return "ok";
          } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
          }
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
        const saleTransactionDTOJson: string = await this.cacheManager.get(
          "sale_transaction_id_" + id,
        );
        const updateSaleTransactionDTO: SaleTransactionPayment = JSON.parse(
          saleTransactionDTOJson,
        );
        try {
          const saleTransaction = await this.saleTransactionsService.findById(
            updateSaleTransactionDTO.id,
          );
          if (!saleTransaction) {
            throw new HttpException("not found", HttpStatus.NOT_FOUND);
          }
          const buyer = await this.customerService.findById(
            saleTransaction.buyerId,
          );
          const seller = await this.customerService.findById(
            saleTransaction.sellerId,
          );
          const pet = await this.petsService.findById(saleTransaction.petId);
          const post = await this.postService.findById(saleTransaction.postId);
          if (!buyer) {
            throw new HttpException("not found", HttpStatus.NOT_FOUND);
          }
          if (!seller) {
            throw new HttpException("not found", HttpStatus.NOT_FOUND);
          }
          const accountSellerInstance =
            await this.userService.findByPhoneNumber(seller.phoneNumber || "");
          if (saleTransaction.status !== SaleTransactionEnum.CREATED) {
            throw new HttpException("status error", HttpStatus.BAD_REQUEST);
          }
          if (!pet) {
            throw new HttpException("not found pet", HttpStatus.BAD_REQUEST);
          }
          if (!post) {
            throw new HttpException("not found post", HttpStatus.BAD_REQUEST);
          }
          this.cacheManager.del("sale_transaction_id_" + id);
          const {
            message,
            transactionTotal,
            paymentMethod,
            ...updateSaleTransaction
          } = updateSaleTransactionDTO;
          await this.saleTransactionsService.update(
            updateSaleTransactionDTO.id,
            {
              ...saleTransaction,
              ...updateSaleTransaction,
              status: SaleTransactionEnum.SUCCESS,
            },
          );
          await this.petsService.update(pet.id, {
            ...pet,
            status: PetEnum.NORMAL,
          });
          await this.postService.update(post.id, {
            ...post,
            status: PostEnum.CLOSED,
          });
          await this.customerService.update(buyer.id, {
            ...buyer,
            point: buyer.point + updateSaleTransactionDTO.point,
          });
          await this.customerService.update(seller.id, {
            ...seller,
            point: seller.point + updateSaleTransactionDTO.point,
          });
          const roomList = await this.roomService.findAllRoomAvailableByPost(
            saleTransaction.postId,
          );
          if (roomList && roomList.length > 0) {
            await Promise.all(
              roomList.map(async (item) => {
                item.status = RoomStatusEnum.CLOSED;
                item.newestMessage =
                  item.buyerId === saleTransaction.buyerId
                    ? message
                    : "We sincerely apologize. The post has made the transaction. We hope to receive your understanding and look forward to continuing to serve you in future transactions.";
                item.newestMessageTime =
                  updateSaleTransactionDTO.transactionTime;
                item.isSellerMessage = true;
                const updatedRoom = await this.roomService.updateRoom(item);
                const createdMessage = await this.messageService.create({
                  content:
                    item.buyerId === saleTransaction.buyerId
                      ? message
                      : "We sincerely apologize. The post has made the transaction. We hope to receive your understanding and look forward to continuing to serve you in future transactions.",
                  createdTime: updateSaleTransactionDTO.transactionTime,
                  isSellerMessage: true,
                  type: MessageEnum.NORMAL,
                  room: item._id,
                });
                this.chatGateway.server
                  .in(item._id.valueOf())
                  .emit("updatedRoom", updatedRoom);
                this.chatGateway.server
                  .in(item._id.valueOf())
                  .emit("chatToClient", createdMessage);
              }),
            );
          }
          this.petOwnerService.updateAllByPetId(saleTransaction.petId);
          this.petOwnerService.store(
            new PetOwner({
              customerId: saleTransaction.buyerId,
              isCurrentOwner: true,
              petId: saleTransaction.petId,
              date: updateSaleTransactionDTO.transactionTime,
            }),
          );
          await this.notificationProducerService.sendMessage(
            {
              body: "Buyer has successfully paid. See information details now.>>>>",
              title: "Successful Sale Transaction.",
              type: NotificationEnum.SUCCESS_SALE_TRANSACTION,
              metadata: String(saleTransaction.id),
            },
            accountSellerInstance.id,
          );

          if (pet.specialMarkings) {
            const fullDataPet = await this.petsService.getOne(pet.id, true);
            await this.axiosService.setData(
              fullDataPet,
              "CHANGE_OWNER",
              "The pet has new owner.",
              pet.specialMarkings,
            );
          }
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
}
