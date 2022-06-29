import { ApiProperty } from "@nestjs/swagger";
import { SaleTransaction } from "src/entities/transaction_service/sale-transaction.entity";

export class ResponseSaleTransaction extends SaleTransaction {
  @ApiProperty()
  isSuccess: boolean;
}
