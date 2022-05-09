import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNumber } from "class-validator";
import { PetEnum } from "src/enum";
import { HealthServiceDTO } from "./create-health-service.dto";

export class HealthRecordDTO extends HealthServiceDTO {
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
  content: string;

  @ApiProperty({ enum: PetEnum })
  petStatus: PetEnum;

  @ApiProperty()
  @IsDate()
  dateOfExam: Date;

  @ApiProperty()
  @IsDate()
  nextHealthCheck: Date;
}
