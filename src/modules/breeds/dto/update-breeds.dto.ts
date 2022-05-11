import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber } from "class-validator";
import { CreateBreedsDTO } from "./create-breeds.dto";

export class UpdateBreedsDTO extends CreateBreedsDTO {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  id: number;
}
