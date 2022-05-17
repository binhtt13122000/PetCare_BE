import { ApiProperty } from "@nestjs/swagger";

export class IdParams {
  @ApiProperty()
  id: number;
}

export class IdQuery {
  @ApiProperty()
  id: number;
}

export class IdsQuery {
  @ApiProperty({ type: "number", isArray: true })
  ids: number[];
}

export class PaymentQuery {
  @ApiProperty()
  message: string;
  @ApiProperty({ enum: ["vi", "en"] })
  locale?: "vn" | "en";
  @ApiProperty({ enum: ["vnpay", "momo"] })
  paymentMethod?: "vnpay" | "momo";
}

export interface Message {
  title: string;
  body: string;
  requireInteraction?: boolean;
  link?: string;
}

export const DEFAULT_PASSWORD = "123456";
