import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { Min, Max, IsOptional, IsEnum } from "class-validator";
import { PageOptionsDto } from "src/common/page-options.dto";
import { ServiceOrderName } from "src/enum";

export class ServiceOptionDto extends PageOptionsDto {
  @ApiPropertyOptional({ enum: ServiceOrderName, default: ServiceOrderName.ID })
  @IsEnum(ServiceOrderName)
  @IsOptional()
  orderName?: ServiceOrderName = ServiceOrderName.ID;

  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiPropertyOptional({
    minimum: 0,
    maximum: 9999999,
    default: 1,
  })
  @Type(() => Number)
  @Min(0)
  @Max(9999999)
  @IsOptional()
  priceFrom?: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 10000000,
    default: 100000,
  })
  @Type(() => Number)
  @Min(5)
  @Max(10000000)
  @IsOptional()
  priceTo?: number = 100000;

  @ApiProperty({ required: false })
  isHealthCheck?: boolean;

  @ApiProperty({ required: false })
  status?: boolean;
}
