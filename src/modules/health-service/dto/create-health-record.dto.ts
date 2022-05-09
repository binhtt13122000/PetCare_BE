import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNumber } from "class-validator";

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
  contentOfHealthRecord: string;

  @ApiProperty()
  petStatusOfHealthRecord: string;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  dateOfExam: Date;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  nextHealthCheck: Date;
}
