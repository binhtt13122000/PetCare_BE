import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { Min, IsString, Max } from "class-validator";
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
  @Type(() => Number)
  @Min(0)
  discount: number;
  @ApiProperty()
  @Type(() => Number)
  @Min(0)
  transactionTotal: number;
  @ApiProperty()
  description: string;
  @ApiProperty()
  @IsString()
  paymentMethod: string;
  @ApiProperty()
  @Type(() => Number)
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
