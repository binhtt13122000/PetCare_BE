import { ApiProperty, OmitType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNumber, IsString } from "class-validator";
import { HealthServiceDTO } from "./create-health-service.dto";

export class HealthRecordDTO extends OmitType(HealthServiceDTO, [
  "healthRecordId",
]) {
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

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  nextHealthCheck: Date;
}
