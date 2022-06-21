import { BreedingTransactionEnum } from "src/enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateBreedTransactionDTO {
  @ApiProperty()
  createdTime: Date;
  @ApiProperty()
  placeMeeting: string;
  @ApiProperty()
  meetingTime: Date;
  @ApiProperty()
  sellerReceive: number;
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
  @ApiProperty()
  transactionFee: number;
  @ApiProperty()
  self: boolean;
}

export class PaymentForPetMaleOwnerDTO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  paymentForMalePetOwnerTime: Date;
}

export class PaymentForBranchDTO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  comboId: number;
  @ApiProperty()
  paymentForMalePetOwnerTime: Date;
}
