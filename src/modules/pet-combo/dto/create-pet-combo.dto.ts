import { ApiProperty } from "@nestjs/swagger";
import { PaymentOrderMethodEnum } from "src/enum";

export class PetComboDTO {
  @ApiProperty()
  registerTime: Date;

  @ApiProperty()
  orderTotal: number;

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

  @ApiProperty({ enum: PaymentOrderMethodEnum, required: false })
  paymentMethod: PaymentOrderMethodEnum;
}

export class PetComboPaymentDTO extends PetComboDTO {
  @ApiProperty()
  dateOfBreeding: Date;
}
