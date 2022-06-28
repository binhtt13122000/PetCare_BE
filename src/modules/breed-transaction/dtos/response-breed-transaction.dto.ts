import { ApiProperty } from "@nestjs/swagger";
import { BreedingTransaction } from "src/entities/transaction_service/breeding-transaction.entity";

export class ResponseBreedingTransaction extends BreedingTransaction {
  @ApiProperty()
  isSuccess: boolean;
}
