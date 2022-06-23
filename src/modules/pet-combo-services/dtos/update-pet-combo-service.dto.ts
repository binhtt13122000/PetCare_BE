import { ApiProperty } from "@nestjs/swagger";

export class UpdatePetComboServiceDTO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  realTime: Date;
  @ApiProperty()
  isCompleted: boolean;
  @ApiProperty()
  star: number;
  @ApiProperty()
  review: number;
  @ApiProperty()
  isAllCompleted: boolean;
}
