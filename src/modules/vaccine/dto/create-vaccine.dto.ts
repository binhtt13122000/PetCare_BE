import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";
export class CreateVaccineDTO {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  origin: string;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;
}
