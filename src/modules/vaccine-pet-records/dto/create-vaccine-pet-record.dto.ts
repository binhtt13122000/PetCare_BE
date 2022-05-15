import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class CreateVaccinePetRecordDTO {
  @ApiProperty()
  dateOfInjection: Date;

  @ApiProperty({ required: false })
  @IsString()
  description: string;

  @ApiProperty()
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
