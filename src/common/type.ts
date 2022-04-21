import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";
export class IdParams {
  @ApiProperty()
  id: number;
}

export class IdQuery {
  @ApiProperty()
  id: number;
}

export class PaymentQuery {
  @ApiProperty()
  @IsInt()
  promotionId?: number;
  @ApiProperty()
  total: number;
  @ApiProperty()
  message: string;
  @ApiProperty({ enum: ["vi", "en"] })
  locale?: "vn" | "en";
  @ApiProperty({ enum: ["vnpay", "momo"] })
  paymentMethod?: "vnpay" | "momo";
}
