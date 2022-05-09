import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNumber } from "class-validator";
import { HealthRecordDTO } from "./create-health-record.dto";

export class HealthServiceDTO extends HealthRecordDTO {
  // @ApiProperty({ type: "string", format: "binary" })
  // evidence: Express.Multer.File;

  @ApiProperty()
  evidence: string;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  serviceId: number;

  @ApiProperty()
  @IsInt()
  price: number;

  @ApiProperty()
  contentOfHealthService: string;

  @ApiProperty()
  petStatusOfHealthService: string;
}
