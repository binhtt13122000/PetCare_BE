import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString, IsInt } from "class-validator";

export class CreateBreedsDTO {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  description: string;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty()
  @IsInt()
  speciesId: number;
}
