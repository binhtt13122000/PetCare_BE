import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber } from "class-validator";
import { CreatePromotionDTO } from "./create-promotion.dto";

export class UpdatePromotionDTO extends CreatePromotionDTO {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  id: number;
}
