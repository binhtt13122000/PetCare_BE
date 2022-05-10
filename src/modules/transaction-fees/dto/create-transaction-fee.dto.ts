import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class CreateTrasactionFeeDTO {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  min: number;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  max: number;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  price: number;
}
