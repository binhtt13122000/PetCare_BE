import { ApiProperty } from "@nestjs/swagger";

export class CancelDTO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  reasonCancel: string;
  @ApiProperty()
  cancelTime: Date;
}
