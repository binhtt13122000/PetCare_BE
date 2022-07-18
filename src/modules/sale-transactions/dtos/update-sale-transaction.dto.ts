import { ApiProperty } from "@nestjs/swagger";
import { SaleTransactionEnum } from "src/enum";

export class UpdateSaleTransactionDTO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  meetingTime: Date;
  @ApiProperty()
  placeMeeting: string;
  @ApiProperty()
  transactionTime: Date;
  @ApiProperty()
  star: number;
  @ApiProperty()
  review: string;
  @ApiProperty()
  reasonCancel: string;
  @ApiProperty()
  cancelTime: Date;
  @ApiProperty({ type: "enum", enum: SaleTransactionEnum })
  status: SaleTransactionEnum;
  @ApiProperty()
  point: number;
  @ApiProperty()
  message?: string;
}
