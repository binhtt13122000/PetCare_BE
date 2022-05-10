import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber } from "class-validator";
import { CreateTrasactionFeeDTO } from "./create-transaction-fee.dto";

export class UpdateTransactionFeeDTO extends CreateTrasactionFeeDTO {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  id: number;
}
