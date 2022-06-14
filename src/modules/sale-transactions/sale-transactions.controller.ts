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
    private notificationProducerService: NotificationProducerService,
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

  @Get(":id")
  async getOne(@Param("id") id: number): Promise<SaleTransaction> {
    return await this.saleTransactionsService.getOne(id);
  }

  @Post()
  async create(
    @Body() body: CreateSaleTransactionDTO,
  ): Promise<SaleTransaction> {
    try {
      const post = await this.postService.findById(body.postId);
      if (!post) {
        throw new NotFoundException("dont have post");
      }
      post.status = PostEnum.WAITING_FOR_PAYMENT;
      await this.postService.update(post.id, post);
      return this.saleTransactionsService.store(new SaleTransaction(body));
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

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
      return this.saleTransactionsService.update(body.id, {
        ...currentSaleTransaction,
        ...rest,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

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
          const { message, ...updateSaleTransaction } =
            updateSaleTransactionDTO;
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
          const room = await this.roomService.findByBuyerAndPost(
            saleTransaction.buyerId,
            saleTransaction.postId,
          );
          if (!room) {
            throw new HttpException("not found", HttpStatus.NOT_FOUND);
          }
          room.status = RoomStatusEnum.CLOSED;
          room.newestMessage = message;
          room.newestMessageTime = updateSaleTransactionDTO.transactionTime;
          room.isSellerMessage = true;
          const updatedRoom = await this.roomService.updateRoom(room);
          const createdMessage = await this.messageService.create({
            content: message,
            createdTime: updateSaleTransactionDTO.transactionTime,
            isSellerMessage: true,
            type: MessageEnum.NORMAL,
            room: room._id,
          });
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
          this.chatGateway.server
            .in(room._id.valueOf())
            .emit("updatedRoom", updatedRoom);
          this.chatGateway.server
            .in(room._id.valueOf())
            .emit("chatToClient", createdMessage);
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
