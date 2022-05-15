import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsOptional, Max, Min } from "class-validator";
import { OrderType, ServiceOrderName } from "src/enum";

export class PageOptionsDto {
  @ApiPropertyOptional({ enum: OrderType, default: OrderType.ASC })
  @IsEnum(OrderType)
  @IsOptional()
  readonly orderType?: OrderType = OrderType.ASC;

  @ApiPropertyOptional({ enum: ServiceOrderName, default: ServiceOrderName.ID })
  @IsEnum(ServiceOrderName)
  @IsOptional()
  readonly serviceOrderName?: ServiceOrderName = ServiceOrderName.ID;

  @ApiProperty({ required: false })
  status?: boolean;

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
  readonly name?: string;

  @ApiProperty({ required: false })
  readonly description?: string;

  get skip(): number {
    return (this.page - 1) * this.limit;
  }
}
