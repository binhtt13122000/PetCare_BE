import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsInt, IsBoolean } from "class-validator";
import { Type } from "class-transformer";
export class CreateServiceDTO {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  price: number;
  @ApiProperty()
  @IsString()
  description: string;
  @ApiProperty()
  @IsBoolean()
  status: boolean;
  @ApiProperty()
  @IsBoolean()
  isHealthCheck: boolean;
  @ApiProperty()
  unit: string;
  @ApiProperty()
  healthCheckTemplate: string;
}
