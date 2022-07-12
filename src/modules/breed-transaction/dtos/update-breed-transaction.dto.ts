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
  serviceFee: number;
  @ApiProperty()
  point: number;
  @ApiProperty()
  pickupMalePetTime: Date;
  @ApiProperty()
  cancelTime: Date;
  @ApiProperty()
  evidence: string;
  @ApiProperty()
  star: number;
  @ApiProperty()
  review: string;
  @ApiProperty()
  reasonCancel: string;
  @ApiProperty()
  breedingBranchId: number;
  @ApiProperty({
    enum: BreedingTransactionEnum,
    default: BreedingTransactionEnum.CREATED,
  })
  status: BreedingTransactionEnum;
  @ApiProperty()
  message?: string;
}
