import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class HealthServiceDto {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  serviceId: number;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  price: number;

  @ApiProperty()
  content: string;

  @ApiProperty()
  petStatus: string;
}

export class IArrayHeathService {
  @ApiProperty({ type: [HealthServiceDto] })
  @Type(() => HealthServiceDto)
  // @ValidateNested({ each: true })
  items: HealthServiceDto[];
}
