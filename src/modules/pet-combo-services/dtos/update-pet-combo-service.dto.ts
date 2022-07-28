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
  @ApiProperty({ required: false })
  isAllCompleted: boolean;
  @ApiProperty({ required: false })
  microchip: string;
  @ApiProperty()
  workingTime: Date;
  @ApiProperty({ type: "string", format: "binary" })
  file: Express.Multer.File;
}
