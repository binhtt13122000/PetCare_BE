import { ApiProperty } from "@nestjs/swagger";
export class SaleTransactionPayment {
  @ApiProperty()
  id: number;
  @ApiProperty()
  transactionTime: Date;
  @ApiProperty()
  transactionTotal: number;
  @ApiProperty()
  paymentMethod: string;
  @ApiProperty()
  point: number;
}
