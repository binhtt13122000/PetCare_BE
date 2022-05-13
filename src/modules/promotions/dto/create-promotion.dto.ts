import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreatePromotionDTO {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  description: string;

  @ApiProperty()
  @IsBoolean()
  status: boolean;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  promo: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  applyMoney: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  maxMoneyPromo: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @Type(() => Number)
  customerId: number;

  @ApiProperty()
  startTime: Date;

  @ApiProperty()
  expireTime: Date;
}
