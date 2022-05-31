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
  PaymentOrderMethodEnum,
  PostEnum,
  SaleTransactionEnum,
} from "src/enum/index";
import { Request } from "express";
import { vnpayService } from "src/external/vnpay.service";
import { format } from "date-fns";
import { Cache } from "cache-manager";
import { CustomerService } from "../customer/customer.service";
import { SaleTransactionPayment } from "./dtos/payment.dto";
import { PostsService } from "../posts/posts.service";

@Controller("sale-transactions")
@ApiTags("sale-transactions")
export class SaleTransactionsController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly saleTransactionsService: SaleTransactionsService,
    private readonly customerService: CustomerService,
    private readonly postService: PostsService,
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
      return this.saleTransactionsService.update(body.id, {
        ...currentSaleTransaction,
        ...body,
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
          if (!buyer) {
            throw new HttpException("not found", HttpStatus.NOT_FOUND);
          }
          if (saleTransaction.status !== SaleTransactionEnum.CREATED) {
            throw new HttpException("status error", HttpStatus.BAD_REQUEST);
          }
          this.cacheManager.del("sale_transaction_id_" + id);
          await this.saleTransactionsService.update(
            updateSaleTransactionDTO.id,
            {
              ...saleTransaction,
              ...updateSaleTransactionDTO,
              status: SaleTransactionEnum.SUCCESS,
            },
          );
          await this.customerService.update(buyer.id, {
            ...buyer,
            point: buyer.point + updateSaleTransactionDTO.point,
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
