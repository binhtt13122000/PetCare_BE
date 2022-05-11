import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsNumber, IsString } from "class-validator";

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
  @Type(() => Number)
  @IsNumber()
  speciesId: number;
}
