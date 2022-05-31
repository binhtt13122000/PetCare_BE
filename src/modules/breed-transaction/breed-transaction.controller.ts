import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Get,
  Query,
} from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { BreedingTransaction } from "src/entities/transaction_service/breeding-transaction.entity";
import { BreedTransactionService } from "./breed-transaction.service";
import { CreateBreedTransactionDTO } from "./dtos/create-breed-transaction.dto";

@Controller("breed-transactions")
@ApiTags("breed-transactions")
export class BreedTransactionController {
  constructor(
    private readonly breedTransactionService: BreedTransactionService,
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
  ): Promise<BreedingTransaction[]> {
    if (buyerId) {
      return await this.breedTransactionService.getBreedTransactionsByBuyerId(
        Number(buyerId),
        limit ? Number(limit) : 10,
        page ? Number(page) : 1,
      );
    }
    if (sellerId) {
      return await this.breedTransactionService.getBreedTransactionsBySellerId(
        Number(sellerId),
        limit ? Number(limit) : 10,
        page ? Number(page) : 1,
      );
    }
    return await this.breedTransactionService.index();
  }

  @Post()
  async create(
    @Body() body: CreateBreedTransactionDTO,
  ): Promise<BreedingTransaction> {
    try {
      return await this.breedTransactionService.store(
        new BreedingTransaction({ ...body }),
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
