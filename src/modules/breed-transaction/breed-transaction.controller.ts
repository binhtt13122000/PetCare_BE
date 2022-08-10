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
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { ApiConsumes, ApiQuery, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { PaymentQuery } from "src/common";
import { BreedingTransaction } from "src/entities/transaction_service/breeding-transaction.entity";
import { ResponsePayment } from "../orders/dto/response-payment.dto";
import { BreedTransactionService } from "./breed-transaction.service";
import { BreedTransactionPayment } from "./dtos/breed-transaction-payment.dto";
import {
  CancelDTO,
  ChangeToFinishDTO,
  ChangeToInProgressDTO,
  CheckSuccessDTO,
  CreateBreedTransactionDTO,
  PaymentForBranchDTO,
  PaymentForPetMaleOwnerDTO,
  PickUpFemaleDTO,
  PickUpMaleDTO,
  ReviewDTO,
} from "./dtos/create-breed-transaction.dto";
import {
  BreedingTransactionEnum,
  NotificationEnum,
  PaymentOrderMethodEnum,
  PetEnum,
  PostEnum,
  RoomStatusEnum,
  TicketStatusEnum,
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
import { FileInterceptor } from "@nestjs/platform-express";
import { uploadService } from "src/external/uploadFile.service";
import { ResponseBreedingTransaction } from "./dtos/response-breed-transaction.dto";
import { TicketsService } from "../tickets/tickets.service";

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
    private readonly ticketService: TicketsService,
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

  @Post("petMaleOwner/payment")
  async paymentForPetMaleOwner(
    @Body() body: PaymentForPetMaleOwnerDTO,
  ): Promise<BreedingTransaction> {
    const breedTransaction = await this.breedTransactionService.findById(
      body.id,
    );
    if (!breedTransaction) {
      throw new NotFoundException("not found");
    }
    const petMale = await this.petsService.findById(breedTransaction.petMaleId);
    if (!petMale) {
      throw new NotFoundException("not found pet male");
    }
    const petFemale = await this.petsService.findById(
      breedTransaction.petFemaleId,
    );
    if (!petFemale) {
      throw new NotFoundException("not found pet female");
    }
    const buyer = await this.customerService.findById(
      breedTransaction.ownerPetFemaleId,
    );
    if (!buyer) {
      throw new NotFoundException("not found buyer");
    }
    const seller = await this.customerService.findById(
      breedTransaction.ownerPetMaleId,
    );
    if (!seller) {
      throw new NotFoundException("not found seller");
    }
    const accountSellerInstance = await this.userService.findByPhoneNumber(
      seller.phoneNumber || "",
    );
    const post = await this.postService.findById(breedTransaction.postId);
    if (!post) {
      throw new NotFoundException("not found post");
    }
    const roomList = await this.roomService.findAllRoomAvailableByPost(
      breedTransaction.postId,
    );
    if (roomList && roomList.length > 0) {
      await Promise.all(
        roomList.map(async (item) => {
          const message =
            item.buyerId === breedTransaction.ownerPetFemaleId
              ? "Congratulations! You have made a successful transaction"
              : "We sincerely apologize. The post has made the transaction. We hope to receive your understanding and look forward to continuing to serve you in future transactions.";
          item.status = RoomStatusEnum.CLOSED;
          item.newestMessage = message;
          item.newestMessageTime = body.paymentTime;
          item.isSellerMessage = true;
          const createdMessage = await this.messageService.create({
            content: message,
            createdTime: body.paymentTime,
            isSellerMessage: true,
            type: MessageEnum.NORMAL,
            room: item._id,
          });
          const updatedRoom = await this.roomService.updateRoom(item);
          this.chatGateway.server
            .in(item._id.valueOf())
            .emit("updatedRoom", updatedRoom);
          this.chatGateway.server
            .in(item._id.valueOf())
            .emit("chatToClient", createdMessage);
        }),
      );
    }
    await this.postService.update(post.id, {
      ...post,
      status: PostEnum.CLOSED,
    });
    await this.petsService.update(petMale.id, {
      ...petMale,
      status: PetEnum.NORMAL,
    });
    await this.petsService.update(petFemale.id, {
      ...petFemale,
      status: PetEnum.NORMAL,
    });
    await this.customerService.update(seller.id, {
      ...seller,
      point: seller.point + breedTransaction.point,
    });
    await this.customerService.update(buyer.id, {
      ...buyer,
      point: buyer.point + breedTransaction.point,
    });
    const updatedBreedTransaction = new BreedingTransaction({
      ...breedTransaction,
      paymentTime: body.paymentTime,
      status: BreedingTransactionEnum.SUCCESS,
    });
    const breedingTransactionUpdated =
      await this.breedTransactionService.update(body.id, {
        ...updatedBreedTransaction,
      });
    await this.notificationProducerService.sendMessage(
      {
        body: "Buyer has successfully paid. See information details now.>>>>",
        title: "Successful Breeding Transaction.",
        type: NotificationEnum.BREEDING_TRANSACTION_SUCCESS,
        metadata: String(breedingTransactionUpdated.id),
      },
      accountSellerInstance.id,
    );
    return breedingTransactionUpdated;
  }

  @Post("branch/request")
  async paymentForBranch(
    @Body() body: PaymentForBranchDTO,
  ): Promise<BreedingTransaction> {
    const breedTransaction = await this.breedTransactionService.findById(
      body.id,
    );
    if (!breedTransaction) {
      throw new NotFoundException("not found");
    }
    const petMale = await this.petsService.findById(breedTransaction.petMaleId);
    if (!petMale) {
      throw new NotFoundException("not found pet male");
    }
    const petFemale = await this.petsService.findById(
      breedTransaction.petFemaleId,
    );
    if (!petFemale) {
      throw new NotFoundException("not found pet female");
    }
    const buyer = await this.customerService.findById(
      breedTransaction.ownerPetFemaleId,
    );
    if (!buyer) {
      throw new NotFoundException("not found buyer");
    }
    const seller = await this.customerService.findById(
      breedTransaction.ownerPetMaleId,
    );
    if (!seller) {
      throw new NotFoundException("not found seller");
    }
    await this.petsService.update(petMale.id, {
      ...petMale,
      status: PetEnum.IN_BREED,
    });
    await this.petsService.update(petFemale.id, {
      ...petFemale,
      status: PetEnum.IN_BREED,
    });
    const updatedBreedTransaction = new BreedingTransaction({
      ...breedTransaction,
      status: BreedingTransactionEnum.BREEDING_REQUESTED,
      breedingBranchId: body.breedingBranchId,
      dateOfBreeding: body.dateOfBreeding,
    });
    const breedTransactionUpdated = await this.breedTransactionService.update(
      body.id,
      {
        ...updatedBreedTransaction,
      },
    );
    return breedTransactionUpdated;
  }

  @Post()
  async create(@Body() body: CreateBreedTransactionDTO): Promise<
    | ResponseBreedingTransaction
    | {
        isSuccess: boolean;
      }
  > {
    try {
      const post = await this.postService.findById(body.postId);
      if (!post) {
        throw new NotFoundException("don't have post");
      }
      const petMale = await this.petsService.findById(body.petMaleId);
      if (!petMale) {
        throw new NotFoundException("don't have pet male");
      }
      const petFemale = await this.petsService.findById(body.petFemaleId);
      if (!petFemale) {
        throw new NotFoundException("don't have pet female");
      }
      const checkExistedBreedingTransactionWithPostId =
        await this.breedTransactionService.checkExistedBreedingTransactionAvailableWithPostId(
          body.postId,
        );
      if (checkExistedBreedingTransactionWithPostId > 0) {
        return {
          isSuccess: false,
        };
      }
      post.status = PostEnum.WAITING_FOR_PAYMENT;
      await this.postService.update(post.id, post);
      await this.petsService.update(petMale.id, {
        ...petMale,
        status: PetEnum.IN_BREED,
      });
      await this.petsService.update(petFemale.id, {
        ...petFemale,
        status: PetEnum.IN_BREED,
      });
      const breedTransactionCreated = await this.breedTransactionService.store(
        new BreedingTransaction({
          ...body,
          status: BreedingTransactionEnum.CREATED,
        }),
      );
      return {
        ...breedTransactionCreated,
        isSuccess: true,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Put("cancel")
  async cancel(@Body() body: CancelDTO): Promise<BreedingTransaction> {
    try {
      const breedingTransaction = await this.breedTransactionService.findById(
        body.id,
      );
      if (!breedingTransaction) {
        throw new NotFoundException("not found breeding transaction");
      }
      const customerInstance = await this.customerService.findById(
        breedingTransaction.ownerPetMaleId,
      );
      if (!customerInstance) {
        throw new NotFoundException("Not found customer");
      }
      const accountCustomerInstance = await this.userService.findByPhoneNumber(
        customerInstance.phoneNumber,
      );
      const petMale = await this.petsService.findById(
        breedingTransaction.petMaleId,
      );
      if (!petMale) {
        throw new NotFoundException("don't have pet male");
      }
      const petFemale = await this.petsService.findById(
        breedingTransaction.petFemaleId,
      );
      if (!petFemale) {
        throw new NotFoundException("don't have pet female");
      }
      const post = await this.postService.findById(breedingTransaction.postId);
      if (!post) {
        throw new NotFoundException("not found post");
      }
      await this.petsService.update(petMale.id, {
        ...petMale,
        status: PetEnum.IN_POST,
      });
      await this.petsService.update(petFemale.id, {
        ...petFemale,
        status: PetEnum.NORMAL,
      });
      await this.postService.update(post.id, {
        ...post,
        status: PostEnum.PUBLISHED,
      });
      const updatedBreedTransaction = await this.breedTransactionService.update(
        breedingTransaction.id,
        {
          ...breedingTransaction,
          status: BreedingTransactionEnum.CANCELED,
          reasonCancel: body.reasonCancel,
          cancelTime: body.cancelTime,
        },
      );
      await this.notificationProducerService.sendMessage(
        {
          body: "Buyer have been canceled your breeding transaction. See information details now.>>>>",
          title: `Breeding Transaction #${updatedBreedTransaction.id} Canceled`,
          type: NotificationEnum.CANCELED_BREEDING_TRANSACTION,
          metadata: String(updatedBreedTransaction.id),
        },
        accountCustomerInstance.id,
      );
      return updatedBreedTransaction;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Put("cancel-breed")
  async cancelBreed(@Body() body: CancelDTO): Promise<BreedingTransaction> {
    try {
      const breedingTransaction = await this.breedTransactionService.findById(
        body.id,
      );
      if (!breedingTransaction) {
        throw new NotFoundException("not found breeding transaction");
      }
      const customerInstance = await this.customerService.findById(
        breedingTransaction.ownerPetMaleId,
      );
      if (!customerInstance) {
        throw new NotFoundException("Not found customer");
      }
      const accountCustomerInstance = await this.userService.findByPhoneNumber(
        customerInstance.phoneNumber,
      );
      const petMale = await this.petsService.findById(
        breedingTransaction.petMaleId,
      );
      if (!petMale) {
        throw new NotFoundException("don't have pet male");
      }
      const petFemale = await this.petsService.findById(
        breedingTransaction.petFemaleId,
      );
      if (!petFemale) {
        throw new NotFoundException("don't have pet female");
      }
      const post = await this.postService.findById(breedingTransaction.postId);
      if (!post) {
        throw new NotFoundException("not found post");
      }
      const ticketBuyer = await this.ticketService.getTicketsByUserId(
        breedingTransaction.ownerPetFemaleId,
      );
      if (ticketBuyer) {
        ticketBuyer.status = TicketStatusEnum.CANCELED;
        ticketBuyer.save();
      }
      await this.postService.update(post.id, {
        ...post,
        status: PostEnum.PUBLISHED,
      });
      await this.petsService.update(petMale.id, {
        ...petMale,
        status: PetEnum.IN_POST,
      });
      await this.petsService.update(petFemale.id, {
        ...petFemale,
        status: PetEnum.NORMAL,
      });
      const updatedBreedTransaction = await this.breedTransactionService.update(
        breedingTransaction.id,
        {
          ...breedingTransaction,
          status: BreedingTransactionEnum.BREEDING_CANCELED,
          reasonCancel: body.reasonCancel,
          cancelTime: body.cancelTime,
        },
      );
      await this.notificationProducerService.sendMessage(
        {
          body: "Buyer have been canceled your breeding transaction. See information details now.>>>>",
          title: `Breeding Transaction #${updatedBreedTransaction.id} Canceled`,
          type: NotificationEnum.CANCELED_BREEDING_TRANSACTION,
          metadata: String(updatedBreedTransaction.id),
        },
        accountCustomerInstance.id,
      );
      return updatedBreedTransaction;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Put("change-to-in-progress")
  async changeToInProgress(
    @Body() body: ChangeToInProgressDTO,
  ): Promise<BreedingTransaction> {
    const breedingTransaction = await this.breedTransactionService.findById(
      body.id,
    );
    if (!breedingTransaction) {
      throw new NotFoundException("not found breeding transaction");
    }
    const petMale = await this.petsService.findById(
      breedingTransaction.petMaleId,
    );
    if (!petMale) {
      throw new NotFoundException("don't have pet male");
    }
    const petFemale = await this.petsService.findById(
      breedingTransaction.petFemaleId,
    );
    if (!petFemale) {
      throw new NotFoundException("don't have pet female");
    }
    const buyer = await this.customerService.findById(
      breedingTransaction.ownerPetFemaleId,
    );
    const seller = await this.customerService.findById(
      breedingTransaction.ownerPetMaleId,
    );
    if (!buyer) {
      throw new HttpException("not found", HttpStatus.NOT_FOUND);
    }
    if (!seller) {
      throw new HttpException("not found", HttpStatus.NOT_FOUND);
    }
    const post = await this.postService.findById(breedingTransaction.postId);
    if (!post) {
      throw new NotFoundException("not found post");
    }
    const accountSellerInstance = await this.userService.findByPhoneNumber(
      seller.phoneNumber || "",
    );
    const accountBuyerInstance = await this.userService.findByPhoneNumber(
      buyer.phoneNumber || "",
    );
    const ticketBuyer = await this.ticketService.getTicketsByUserId(buyer.id);
    if (ticketBuyer) {
      ticketBuyer.status = TicketStatusEnum.SUCCESS;
      ticketBuyer.save();
    }
    await this.petsService.update(petMale.id, {
      ...petMale,
      status: PetEnum.IN_BREED,
    });
    await this.petsService.update(petFemale.id, {
      ...petFemale,
      status: PetEnum.IN_BREED,
    });
    await this.postService.update(post.id, {
      ...post,
      status: PostEnum.CLOSED,
    });
    const roomList = await this.roomService.findAllRoomAvailableByPost(
      breedingTransaction.postId,
    );
    if (roomList && roomList.length > 0) {
      roomList.forEach(async (item) => {
        let message =
          "We sincerely apologize. The post has made the transaction. We hope to receive your understanding and look forward to continuing to serve you in future transactions.";
        if (item.buyerId === breedingTransaction.ownerPetFemaleId) {
          message = "Congratulations! You have made a successful transaction";
        }
        item.status = RoomStatusEnum.CLOSED;
        item.newestMessage = message;
        item.newestMessageTime = body.dateOfBreeding;
        item.isSellerMessage = true;
        const createdMessage = await this.messageService.create({
          content: message,
          createdTime: body.dateOfBreeding,
          isSellerMessage: true,
          type: MessageEnum.NORMAL,
          room: item._id,
        });
        const updatedRoom = await this.roomService.updateRoom(item);
        this.chatGateway.server
          .in(item._id.valueOf())
          .emit("updatedRoom", updatedRoom);
        this.chatGateway.server
          .in(item._id.valueOf())
          .emit("chatToClient", createdMessage);
      });
    }
    const breedTransactionUpdated = await this.breedTransactionService.update(
      breedingTransaction.id,
      {
        ...breedingTransaction,
        status: BreedingTransactionEnum.IN_PROGRESS,
        dateOfBreeding: body.dateOfBreeding,
        serviceFee: body.serviceFee,
        point: body.point,
      },
    );
    await this.notificationProducerService.sendMessage(
      {
        body: "Your female pet have been progress breeding transaction. See information details now.>>>>",
        title: "In Progress Breeding Transaction.",
        type: NotificationEnum.BREEDING_TRANSACTION_PROGRESSING,
        metadata: String(breedTransactionUpdated.id),
      },
      accountBuyerInstance.id,
    );
    await this.notificationProducerService.sendMessage(
      {
        body: "Your male pet have been progress breeding transaction. See information details now.>>>>",
        title: "In Progress Breeding Transaction.",
        type: NotificationEnum.BREEDING_TRANSACTION_PROGRESSING,
        metadata: String(breedTransactionUpdated.id),
      },
      accountSellerInstance.id,
    );
    return breedTransactionUpdated;
  }

  @Put("change-to-finish")
  async changeToFinish(
    @Body() body: ChangeToFinishDTO,
  ): Promise<BreedingTransaction> {
    const breedingTransaction = await this.breedTransactionService.findById(
      body.id,
    );
    if (!breedingTransaction) {
      throw new NotFoundException("not found breeding transaction");
    }
    const buyer = await this.customerService.findById(
      breedingTransaction.ownerPetFemaleId,
    );
    const seller = await this.customerService.findById(
      breedingTransaction.ownerPetMaleId,
    );
    if (!buyer) {
      throw new HttpException("not found", HttpStatus.NOT_FOUND);
    }
    if (!seller) {
      throw new HttpException("not found", HttpStatus.NOT_FOUND);
    }
    const accountSellerInstance = await this.userService.findByPhoneNumber(
      seller.phoneNumber || "",
    );
    const accountBuyerInstance = await this.userService.findByPhoneNumber(
      buyer.phoneNumber || "",
    );
    const breedTransactionUpdated = await this.breedTransactionService.update(
      breedingTransaction.id,
      {
        ...breedingTransaction,
        status: BreedingTransactionEnum.BREEDING_FINISHED,
        timeToCheckBreeding: body.timeToCheckBreeding,
        dateOfFinish: body.dateOfFinish,
      },
    );
    await this.notificationProducerService.sendMessage(
      {
        body: "Your female pet have been finished breeding transaction. See information details now.>>>>",
        title: "Finished Breeding Transaction.",
        type: NotificationEnum.BREEDING_TRANSACTION_FINISHED,
        metadata: String(breedTransactionUpdated.id),
      },
      accountBuyerInstance.id,
    );
    await this.notificationProducerService.sendMessage(
      {
        body: "Your male pet have been finished breeding transaction. See information details now.>>>>",
        title: "Finished Breeding Transaction.",
        type: NotificationEnum.BREEDING_TRANSACTION_FINISHED,
        metadata: String(breedTransactionUpdated.id),
      },
      accountSellerInstance.id,
    );
    return breedTransactionUpdated;
  }

  @Put("pick-up-pet-male")
  async pickUpPetMale(
    @Body() body: PickUpMaleDTO,
  ): Promise<BreedingTransaction> {
    const breedingTransaction = await this.breedTransactionService.findById(
      body.id,
    );
    if (!breedingTransaction) {
      throw new NotFoundException("not found breeding transaction");
    }
    const petMale = await this.petsService.findById(
      breedingTransaction.petMaleId,
    );
    if (!petMale) {
      throw new NotFoundException("don't have pet male");
    }
    await this.petsService.update(petMale.id, {
      ...petMale,
      status: PetEnum.NORMAL,
    });
    return await this.breedTransactionService.update(breedingTransaction.id, {
      ...breedingTransaction,
      pickupMalePetTime: body.pickupMalePetTime,
    });
  }

  @Put("pick-up-pet-female")
  async pickUpPetFemale(
    @Body() body: PickUpFemaleDTO,
  ): Promise<BreedingTransaction> {
    const breedingTransaction = await this.breedTransactionService.findById(
      body.id,
    );
    if (!breedingTransaction) {
      throw new NotFoundException("not found breeding transaction");
    }
    const petFemale = await this.petsService.findById(
      breedingTransaction.petFemaleId,
    );
    if (!petFemale) {
      throw new NotFoundException("don't have pet female");
    }
    const buyer = await this.customerService.findById(
      breedingTransaction.ownerPetFemaleId,
    );
    if (!buyer) {
      throw new NotFoundException("not found buyer");
    }
    const seller = await this.customerService.findById(
      breedingTransaction.ownerPetMaleId,
    );
    if (!seller) {
      throw new NotFoundException("not found seller");
    }
    const post = await this.postService.findById(breedingTransaction.postId);
    if (!post) {
      throw new NotFoundException("not found post");
    }
    await this.postService.update(post.id, {
      ...post,
      status: PostEnum.CLOSED,
    });
    await this.customerService.update(seller.id, {
      ...seller,
      point: seller.point + breedingTransaction.point,
    });
    await this.customerService.update(buyer.id, {
      ...buyer,
      point: buyer.point + breedingTransaction.point,
    });
    await this.petsService.update(petFemale.id, {
      ...petFemale,
      status: PetEnum.NORMAL,
    });
    const breedTransactionUpdated = await this.breedTransactionService.update(
      breedingTransaction.id,
      {
        ...breedingTransaction,
        status: BreedingTransactionEnum.BREEDING_SUCCESS,
        paymentTime: body.paymentTime,
      },
    );
    return breedTransactionUpdated;
  }

  @Put("check-success")
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("file"))
  async checkSuccess(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CheckSuccessDTO,
  ): Promise<BreedingTransaction> {
    const breedingTransaction = await this.breedTransactionService.findById(
      body.id,
    );
    if (!breedingTransaction) {
      throw new NotFoundException("not found breeding transaction");
    }
    const buyer = await this.customerService.findById(
      breedingTransaction.ownerPetFemaleId,
    );
    if (!buyer) {
      throw new NotFoundException("not found buyer");
    }
    const accountBuyerInstance = await this.userService.findByPhoneNumber(
      buyer.phoneNumber || "",
    );
    if (String(body.isSuccess) === "false") {
      await this.customerService.update(buyer.id, {
        ...buyer,
        point: buyer.point + breedingTransaction.point,
      });
    }
    let evidence = null;
    if (file) {
      const { url } = await uploadService.uploadFile(file);
      evidence = url;
    }
    const breedTransactionUpdated = await this.breedTransactionService.update(
      breedingTransaction.id,
      {
        ...breedingTransaction,
        isSuccess: body.isSuccess,
        evidence: evidence,
        timeToCheckBreeding: body.timeToCheckBreeding,
      },
    );
    await this.notificationProducerService.sendMessage(
      {
        body:
          String(body.isSuccess) === "false"
            ? "Your pet is not pregnant. See information details now.>>>>"
            : "Your pet is pregnant. See information details now.>>>>",
        title: "Result Breeding Transaction",
        type: NotificationEnum.BREEDING_TRANSACTION_RESULT,
        metadata: String(breedTransactionUpdated.id),
      },
      accountBuyerInstance.id,
    );
    return breedTransactionUpdated;
  }

  @Put("review")
  async review(@Body() body: ReviewDTO): Promise<BreedingTransaction> {
    const breedingTransaction = await this.breedTransactionService.findById(
      body.id,
    );
    if (!breedingTransaction) {
      throw new NotFoundException("not found breeding transaction");
    }
    return await this.breedTransactionService.update(body.id, {
      ...breedingTransaction,
      star: body.star,
      review: body.review,
    });
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

  @Get("/pet/:id")
  async getBreedingTransactionAvailableByPetId(
    @Param("id") id: number,
  ): Promise<BreedingTransaction> {
    try {
      const breedTransactionAvailable =
        await this.breedTransactionService.getBreedingTransactionAvailableByPetId(
          id,
        );
      if (breedTransactionAvailable && breedTransactionAvailable.length > 0) {
        return breedTransactionAvailable[0];
      }
      throw new HttpException(
        "Breeding transaction is not found!",
        HttpStatus.NOT_FOUND,
      );
    } catch (error) {
      throw new NotFoundException(error);
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
        throw new BadRequestException("USER_CANCEL_REQUEST");
      },
    );
  }
}
