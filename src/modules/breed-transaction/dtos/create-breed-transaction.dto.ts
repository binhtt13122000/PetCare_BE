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
  // @ApiProperty()
  // paymentForBranchTime: Date;
  @ApiProperty()
  breedingBranchId: number;
  @ApiProperty()
  dateOfBreeding: Date;
}

export class CancelDTO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  reasonCancel: string;
  @ApiProperty()
  cancelTime: Date;
}

export class ChangeToInProgressDTO {
  @ApiProperty()
  id: number;
}

export class PickUpMaleDTO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  pickupMalePetTime: Date;
}

export class PickUpFemaleDTO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  pickupMalePetTime: Date;
}

export class ChangeToFinishDTO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  timeToCheckBreeding: number;
  @ApiProperty()
  serviceFee: number;
  @ApiProperty()
  servicePoint: number;
}

export class CheckSuccessDTO {
  @ApiProperty()
  id: number;
  @ApiProperty({ type: "string", format: "binary" })
  file: Express.Multer.File;
  @ApiProperty()
  isSuccess: boolean;
}
