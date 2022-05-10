import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber } from "class-validator";
import { HealthServiceDTO } from "./create-health-service.dto";

export class CreateHealthServiceToHeathRecordDto extends HealthServiceDTO {
  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  healthRecordId: number;
}
