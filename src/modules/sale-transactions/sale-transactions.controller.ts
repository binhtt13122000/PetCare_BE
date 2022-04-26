import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
  NotFoundException,
  Put,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { SaleTransaction } from "src/entities/transaction_service/sale-transaction.entity";
import { CreateSaleTransactionDTO } from "./dtos/create-sale-transaction.dto";
import { SaleTransactionsService } from "./sale-transactions.service";
import { UpdateSaleTransactionDTO } from "./dtos/update-sale-transaction.dto";

@Controller("sale-transactions")
@ApiTags("sale-transactions")
export class SaleTransactionsController {
  constructor(
    private readonly saleTransactionsService: SaleTransactionsService,
  ) {}

  @Post()
  async create(
    @Body() body: CreateSaleTransactionDTO,
  ): Promise<SaleTransaction> {
    try {
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
      if (currentSaleTransaction) {
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
}
