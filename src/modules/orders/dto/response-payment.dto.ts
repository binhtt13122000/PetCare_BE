import { ApiProperty } from "@nestjs/swagger";

export class ResponsePayment {
  @ApiProperty()
  url: string;
}
