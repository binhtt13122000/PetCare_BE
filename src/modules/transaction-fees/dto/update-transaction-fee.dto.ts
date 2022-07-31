import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class UpdateTransactionFeeDTO {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  id: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  newPrice: number;

  @ApiProperty()
  date: Date;
}
