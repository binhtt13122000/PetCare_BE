import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber } from "class-validator";
import { CreateTransactionFeeDTO } from "./create-transaction-fee.dto";

export class UpdateTransactionFeeDTO extends CreateTransactionFeeDTO {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  id: number;
}
