import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsString, Length } from "class-validator";

export class CreateVaccinePetRecordDTO {
  @ApiProperty()
  dateOfInjection: Date;

  @ApiProperty({ required: false })
  @Length(0, 1024)
  @IsString()
  description: string;

  @ApiProperty()
  @Length(0, 32)
  @IsString()
  type: string;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  vaccineId: number;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  petId: number;
}
