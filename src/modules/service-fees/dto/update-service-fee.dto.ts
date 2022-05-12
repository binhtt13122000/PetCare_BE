import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber } from "class-validator";
import { CreateServiceFeeDTO } from "./create-service-fee.dto";

export class UpdateServiceFeeDTO extends CreateServiceFeeDTO {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  id: number;
}
