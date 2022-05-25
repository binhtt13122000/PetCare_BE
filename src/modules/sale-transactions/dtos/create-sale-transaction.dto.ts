import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { Min, IsString } from "class-validator";
import { SaleTransactionEnum } from "src/enum";

export class CreateSaleTransactionDTO {
  createdTime: Date = new Date();
  @ApiProperty()
  meetingTime: Date;
  @ApiProperty()
  placeMeeting: string;
  @ApiProperty()
  sellerReceive: number;
  @ApiProperty()
  @Type(() => Number)
  @Min(0)
  transactionFee: number;
  @ApiProperty()
  @Type(() => Number)
  @Min(0)
  provisionalTotal: number;
  @ApiProperty()
  @Type(() => Number)
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
