import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { BreedingTransaction } from "src/entities/transaction_service/breeding-transaction.entity";
import { BreedTransactionService } from "./breed-transaction.service";
import { CreateBreedTransactionDTO } from "./dtos/create-breed-transaction.dto";

@Controller("breed-transactions")
@ApiTags("breed-transactions")
export class BreedTransactionController {
  constructor(
    private readonly breedTransactionService: BreedTransactionService,
  ) {}

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
