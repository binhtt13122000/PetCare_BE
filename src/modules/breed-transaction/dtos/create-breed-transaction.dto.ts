import { BreedingTransactionEnum } from "src/enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateBreedTransactionDTO {
  @ApiProperty()
  createdTime: Date;
  @ApiProperty()
  meetingTime: Date;
  @ApiProperty()
  sellerReceive: number;
  @ApiProperty()
  serviceFee: number;
  @ApiProperty()
  transactionTotal: number;
  @ApiProperty()
  point: number;
  @ApiProperty()
  description: string;
  @ApiProperty()
  status: BreedingTransactionEnum;
  @ApiProperty()
  ownerPetMaleId: number;
  @ApiProperty()
  ownerPetFemaleId: number;
  @ApiProperty()
  petMaleId: number;
  @ApiProperty()
  petFemaleId: number;
  @ApiProperty()
  postId: number;
  @ApiProperty()
  branchId: number;
}
