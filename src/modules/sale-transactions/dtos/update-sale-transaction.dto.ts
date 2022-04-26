import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, Min, IsString, Max } from "class-validator";
import { SaleTransactionEnum } from "src/enum";

export class UpdateSaleTransactionDTO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  @IsDate()
  meetingTime: Date;
  @ApiProperty()
  placeMeeting: string;
  @ApiProperty()
  @IsDate()
  transactionTime: Date;
  @ApiProperty()
  @IsInt()
  @Min(0)
  discount: number;
  @ApiProperty()
  @IsInt()
  @Min(0)
  transactionTotal: number;
  @ApiProperty()
  description: string;
  @ApiProperty()
  @IsString()
  paymentMethod: string;
  @ApiProperty()
  @IsInt()
  @Min(0)
  @Max(5)
  star: number;
  @ApiProperty()
  @IsString()
  review: string;
  @ApiProperty()
  @IsString()
  reasonCancel: string;
  @ApiProperty({ type: "enum", enum: SaleTransactionEnum })
  status: SaleTransactionEnum;
  @ApiProperty({ name: "promotionId", nullable: true })
  promotionId: number;
}
