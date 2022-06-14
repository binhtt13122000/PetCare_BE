import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Get,
  Query,
  Param,
  NotFoundException,
  Req,
  HttpException,
  HttpStatus,
  CACHE_MANAGER,
  Inject,
  Put,
} from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { PaymentQuery } from "src/common";
import { BreedingTransaction } from "src/entities/transaction_service/breeding-transaction.entity";
import { ResponsePayment } from "../orders/dto/response-payment.dto";
import { BreedTransactionService } from "./breed-transaction.service";
import { BreedTransactionPayment } from "./dtos/breed-transaction-payment.dto";
import { CreateBreedTransactionDTO } from "./dtos/create-breed-transaction.dto";
import {
  BreedingTransactionEnum,
  NotificationEnum,
  PaymentOrderMethodEnum,
  PostEnum,
  RoomStatusEnum,
} from "src/enum/index";
import { vnpayService } from "src/external/vnpay.service";
import { format } from "date-fns";
import { Cache } from "cache-manager";
import { CustomerService } from "../customer/customer.service";
import { PostsService } from "../posts/posts.service";
import { ChatGateway } from "../chat/chat.gateway";
import { RoomsService } from "../rooms/rooms.service";
import { MessagesService } from "../messages/messages.service";
import { MessageEnum } from "src/schemas/message.schema";
import { UpdateBreedTransactionDTO } from "./dtos/update-breed-transaction.dto";
import { PetsService } from "../pets/pets.service";
import { UserService } from "../users/user.service";
import { NotificationProducerService } from "src/shared/notification/notification.producer.service";

@Controller("breed-transactions")
@ApiTags("breed-transactions")
export class BreedTransactionController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly breedTransactionService: BreedTransactionService,
    private readonly customerService: CustomerService,
    private readonly postService: PostsService,
    private readonly chatGateway: ChatGateway,
    private readonly roomService: RoomsService,
    private readonly messageService: MessagesService,
    private readonly petsService: PetsService,
    private readonly userService: UserService,
    private readonly notificationProducerService: NotificationProducerService,
  ) {}

  @Get()
  @ApiQuery({
    name: "petOwnerFemaleId",
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: "petOwnerMaleId",
    required: false,
    type: Number,
  })
  async getAll(
    @Query("petOwnerFemaleId") petOwnerFemaleId: number,
    @Query("petOwnerMaleId") petOwnerMaleId: number,
    @Query("page") page: number,
    @Query("limit") limit: number,
  ): Promise<BreedingTransaction[]> {
    if (petOwnerFemaleId) {
      return await this.breedTransactionService.getBreedTransactionsByOwnerPetFemaleId(
        petOwnerFemaleId,
        limit ? limit : 10,
        page ? page : 1,
      );
    }
    if (petOwnerMaleId) {
      return await this.breedTransactionService.getBreedTransactionsByOwnerPetMaleIdId(
        petOwnerMaleId,
        limit ? limit : 10,
        page ? page : 1,
      );
    }
    return await this.breedTransactionService.index();
  }

  @Post()
  async create(
    @Body() body: CreateBreedTransactionDTO,
  ): Promise<BreedingTransaction> {
    try {
      const post = await this.postService.findById(body.postId);
      if (!post) {
        throw new NotFoundException("dont have post");
      }
      post.status = PostEnum.WAITING_FOR_PAYMENT;
      await this.postService.update(post.id, post);
      return await this.breedTransactionService.store(
        new BreedingTransaction({ ...body }),
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Put()
  async update(
    @Body() body: UpdateBreedTransactionDTO,
  ): Promise<BreedingTransaction> {
    try {
      const currentBreedTransaction =
        await this.breedTransactionService.findById(body.id);
      if (!currentBreedTransaction) {
        throw new NotFoundException("Cannot found");
      }
      const { message, ...rest } = body;
      if (message) {
        const post = await this.postService.findById(
          currentBreedTransaction.postId,
        );
        if (!post) {
          throw new HttpException("not found post", HttpStatus.BAD_REQUEST);
        }
        await this.postService.update(post.id, {
          ...post,
          status: PostEnum.PUBLISHED,
        });
        const room = await this.roomService.findByBuyerAndPost(
          currentBreedTransaction.ownerPetFemaleId,
          currentBreedTransaction.postId,
        );
        if (!room) {
          throw new HttpException("not found", HttpStatus.NOT_FOUND);
        }
        room.status = RoomStatusEnum.CLOSED;
        room.newestMessage = message;
        room.newestMessageTime = currentBreedTransaction.cancelTime;
        room.isSellerMessage = false;
        const updatedRoom = await this.roomService.updateRoom(room);
        const createdMessage = await this.messageService.create({
          content: message,
          createdTime: currentBreedTransaction.cancelTime,
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
      return this.breedTransactionService.update(body.id, {
        ...currentBreedTransaction,
        ...rest,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(":id")
  @ApiQuery({
    type: String,
    name: "mode",
    required: false,
  })
  async getOne(
    @Param("id") id: number,
    @Query("mode") mode: string,
  ): Promise<BreedingTransaction> {
    try {
      if (mode === "SHORT") {
        return await this.breedTransactionService.findById(id);
      }
      return await this.breedTransactionService.getOne(id);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  @Post("payment")
  async deposit(
    @Req() req: Request,
    @Query() query: PaymentQuery,
    @Body() body: BreedTransactionPayment,
  ): Promise<ResponsePayment> {
    try {
      const breedTransaction = await this.breedTransactionService.findById(
        body.id,
      );
      if (!breedTransaction) {
        throw new HttpException("not found", HttpStatus.NOT_FOUND);
      }
      if (breedTransaction.status !== BreedingTransactionEnum.CREATED) {
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
              "breed_transaction_id_" + body.id,
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
        const breedTransactionDTOJson: string = await this.cacheManager.get(
          "breed_transaction_id_" + id,
        );
        const updateBreedTransactionDTO: BreedTransactionPayment = JSON.parse(
          breedTransactionDTOJson,
        );
        try {
          const breedTransaction = await this.breedTransactionService.findById(
            updateBreedTransactionDTO.id,
          );
          if (!breedTransaction) {
            throw new HttpException("not found", HttpStatus.NOT_FOUND);
          }
          const ownerPetMale = await this.customerService.findById(
            breedTransaction.ownerPetMaleId,
          );
          if (!ownerPetMale) {
            throw new HttpException("not found", HttpStatus.NOT_FOUND);
          }
          const ownerPetFemale = await this.customerService.findById(
            breedTransaction.ownerPetFemaleId,
          );
          if (!ownerPetFemale) {
            throw new HttpException("not found", HttpStatus.NOT_FOUND);
          }
          const accountOwnerPetMaleInstance =
            await this.userService.findByPhoneNumber(
              ownerPetMale.phoneNumber || "",
            );
          if (breedTransaction.status !== BreedingTransactionEnum.CREATED) {
            throw new HttpException("status error", HttpStatus.BAD_REQUEST);
          }
          this.cacheManager.del("breed_transaction_id_" + id);
          const { message, ...updateBreedTransaction } =
            updateBreedTransactionDTO;
          await this.breedTransactionService.update(
            updateBreedTransactionDTO.id,
            {
              ...breedTransaction,
              ...updateBreedTransaction,
              status: BreedingTransactionEnum.SUCCESS,
            },
          );
          await this.customerService.update(ownerPetMale.id, {
            ...ownerPetMale,
            point: ownerPetMale.point + updateBreedTransactionDTO.point,
          });
          await this.customerService.update(ownerPetFemale.id, {
            ...ownerPetFemale,
            point: ownerPetFemale.point + updateBreedTransactionDTO.point,
          });
          const room = await this.roomService.findByBuyerAndPost(
            breedTransaction.ownerPetFemaleId,
            breedTransaction.postId,
          );
          if (!room) {
            throw new HttpException("not found", HttpStatus.NOT_FOUND);
          }
          room.status = RoomStatusEnum.CLOSED;
          room.newestMessage = message;
          room.newestMessageTime = updateBreedTransactionDTO.transactionTime;
          room.isSellerMessage = true;
          const updatedRoom = await this.roomService.updateRoom(room);
          const createdMessage = await this.messageService.create({
            content: message,
            createdTime: updateBreedTransactionDTO.transactionTime,
            isSellerMessage: true,
            type: MessageEnum.NORMAL,
            room: room._id,
          });
          await this.notificationProducerService.sendMessage(
            {
              body: "Buyer has successfully paid. See information details now.>>>>",
              title: "Successful Breeding Transaction.",
              type: NotificationEnum.SUCCESS_BREEDING_TRANSACTION,
              metadata: String(breedTransaction.id),
            },
            accountOwnerPetMaleInstance.id,
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
