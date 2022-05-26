import { ApiProperty } from "@nestjs/swagger";
import { SaleTransactionEnum } from "src/enum";

export class CreateSaleTransactionDTO {
  @ApiProperty()
  createdTime: Date;
  @ApiProperty()
  meetingTime: Date;
  @ApiProperty()
  placeMeeting: string;
  @ApiProperty()
  sellerReceive: number;
  @ApiProperty()
  transactionFee: number;
  @ApiProperty()
  transactionTotal: number;
  @ApiProperty()
  description: string;
  @ApiProperty({ type: "enum", enum: SaleTransactionEnum })
  status: SaleTransactionEnum;
  @ApiProperty()
  buyerId: number;
  @ApiProperty()
  sellerId: number;
  @ApiProperty()
  petId: number;
  @ApiProperty()
  postId: number;
  @ApiProperty()
  point: number;
}
