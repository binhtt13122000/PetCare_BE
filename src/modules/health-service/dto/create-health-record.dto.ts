import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNumber, IsString } from "class-validator";

export class HealthRecordDTO {
  @ApiProperty({ type: "array", items: { type: "string", format: "binary" } })
  files: Array<Express.Multer.File>;

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
  content: string;

  @ApiProperty()
  @IsString()
  petStatus: string;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  dateOfExam: Date;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  nextHealthCheck: Date;
}
