import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsOptional, Max, Min } from "class-validator";
import { OrderType } from "src/enum";

export class PageOptionsDto {
  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 100,
    default: 10,
  })
  @Type(() => Number)
  @Min(1)
  @Max(100)
  @IsOptional()
  readonly limit?: number = 10;

  @ApiProperty({ required: false })
  filtering?: string;

  @ApiPropertyOptional({ enum: OrderType, default: OrderType.ASC })
  @IsEnum(OrderType)
  @IsOptional()
  readonly orderType?: OrderType = OrderType.ASC;

  get skip(): number {
    return (this.page - 1) * this.limit;
  }
}
