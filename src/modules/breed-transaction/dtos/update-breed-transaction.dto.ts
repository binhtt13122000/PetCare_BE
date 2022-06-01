import { ApiProperty } from "@nestjs/swagger";
import { BreedingTransactionEnum } from "src/enum";

export class UpdateBreedTransactionDTO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  meetingTime: Date;
  @ApiProperty()
  dateOfBreeding: Date;
  @ApiProperty()
  sellerReceive: number;
  @ApiProperty()
  serviceFee: number;
  @ApiProperty()
  transactionTotal: number;
  @ApiProperty()
  point: number;
  @ApiProperty()
  pickupMalePetTime: Date;
  @ApiProperty()
  pickupFemalePetTime: Date;
  @ApiProperty()
  cancelTime: Date;
  @ApiProperty()
  evidence: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  paymentMethod: string;
  @ApiProperty()
  star: number;
  @ApiProperty()
  review: string;
  @ApiProperty()
  reasonCancel: string;
  @ApiProperty({
    enum: BreedingTransactionEnum,
    default: BreedingTransactionEnum.CREATED,
  })
  status: BreedingTransactionEnum;
  @ApiProperty()
  message?: string;
}