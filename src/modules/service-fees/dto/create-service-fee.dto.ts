import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class CreateServiceFeeDTO {
  @ApiProperty({ required: false })
  @IsNumber()
  @Type(() => Number)
  min: number;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsNumber()
  max: number;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  price: number;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  serviceId: number;
}
