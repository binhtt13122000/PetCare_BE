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
  @ApiProperty()
  returnUrl: string;
}

export interface Message {
  title: string;
  body: string;
  requireInteraction?: boolean;
  link?: string;
  type?: string;
  metadata?: string;
}

export const DEFAULT_PASSWORD = "123456";
