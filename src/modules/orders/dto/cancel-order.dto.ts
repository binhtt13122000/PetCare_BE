import { ApiProperty } from "@nestjs/swagger";

export class CancelDTO {
  @ApiProperty()
  id: number;
}
