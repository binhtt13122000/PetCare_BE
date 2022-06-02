import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class CreateServiceFeeDTO {
  @ApiProperty({ required: false })
  min: number;

  @ApiProperty({ required: false })
  max: number;

  @ApiProperty()
  price: number;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  serviceId: number;
}
