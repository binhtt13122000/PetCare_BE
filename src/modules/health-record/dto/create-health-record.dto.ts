import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNumber, IsString } from "class-validator";

export class HealthRecordDTO {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  petId: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  weight: number;

  @ApiProperty()
  isPeriodical: boolean;

  @ApiProperty()
  @IsString()
  contentOfHealthRecord: string;

  @ApiProperty()
  @IsString()
  petStatusOfHealthRecord: string;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  dateOfExam: Date;

  @ApiProperty({ required: false })
  @Type(() => Date)
  @IsDate()
  nextHealthCheck: Date;
}
