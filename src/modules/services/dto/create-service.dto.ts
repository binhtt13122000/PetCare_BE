import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsBoolean } from "class-validator";
import { Type } from "class-transformer";
export class CreateServiceDTO {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @Type(() => Number)
  @Type(() => Number)
  price: number;
  @ApiProperty()
  @IsString()
  description: string;
  @ApiProperty()
  @IsBoolean()
  status: boolean;
  @ApiProperty()
  @ApiProperty()
  unit: string;
  @ApiProperty()
  estimatedTime: number;
}
