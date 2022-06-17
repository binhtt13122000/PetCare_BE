import { ApiProperty } from "@nestjs/swagger";

export class CreateChainDTO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  specialMarkings: string;
  @ApiProperty()
  initDate: Date;
}
