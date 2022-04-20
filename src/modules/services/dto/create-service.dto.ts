import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsInt, IsBoolean } from "class-validator";
export class CreateServiceDTO {
  @ApiProperty()
  @IsString()
  @Length(0, 32)
  name: string;
  @ApiProperty()
  @IsInt()
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
}
