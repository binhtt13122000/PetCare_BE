import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString, Length } from "class-validator";
export class CreateVaccineDTO {
  @ApiProperty()
  @Length(8, 32)
  @IsString()
  name: string;

  @ApiProperty()
  @Length(8, 1024)
  @IsString()
  description: string;

  @ApiProperty()
  @Length(8, 1024)
  @IsString()
  origin: string;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;
}
