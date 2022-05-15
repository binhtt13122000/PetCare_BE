import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsOptional, Max, Min } from "class-validator";
import { OrderType } from "src/enum";

export class PageOptionsDto {
  @ApiPropertyOptional({ enum: OrderType, default: OrderType.ASC })
  @IsEnum(OrderType)
  @IsOptional()
  readonly orderType?: OrderType = OrderType.ASC;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  @Type(() => Number)
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly limit?: number = 10;

  @ApiProperty({ required: false })
  readonly filtering?: string;

  get skip(): number {
    return (this.page - 1) * this.limit;
  }
}
