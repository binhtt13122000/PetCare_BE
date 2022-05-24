import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber } from "class-validator";
import { ServiceEnum } from "../../../enum/index";

export class CreateTransactionFeeDTO {
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

  @ApiProperty({ enum: ServiceEnum })
  type: ServiceEnum;
}
