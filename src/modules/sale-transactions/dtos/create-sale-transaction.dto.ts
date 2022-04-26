import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, Min, IsString } from "class-validator";
import { SaleTransactionEnum } from "src/enum";

export class CreateSaleTransactionDTO {
  createdTime: Date = new Date();
  @ApiProperty()
  @IsDate()
  meetingTime: Date;
  @ApiProperty()
  placeMeeting: string;
  @ApiProperty()
  sellerReceive: number;
  @ApiProperty()
  @IsInt()
  @Min(0)
  transactionFee: number;
  @ApiProperty()
  @IsInt()
  @Min(0)
  provisionalTotal: number;
  @ApiProperty()
  @IsInt()
  @Min(0)
  transactionTotal: number;
  @ApiProperty()
  @IsString()
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
}
