import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber } from "class-validator";
import { CreateSpeciesDTO } from "./create-species.dto";

export class UpdateSpeciesDTO extends CreateSpeciesDTO {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  id: number;
}
