import { ApiProperty } from "@nestjs/swagger";

export class PetComboDTO {
  @ApiProperty()
  registerTime: Date;

  @ApiProperty()
  branchId: number;

  @ApiProperty()
  comboId: number;

  @ApiProperty()
  petId: number;

  @ApiProperty({ required: false })
  breedingTransactionId: number;

  @ApiProperty({ required: false })
  point: number;

  @ApiProperty({ required: false })
  paymentMethod: string;
}
