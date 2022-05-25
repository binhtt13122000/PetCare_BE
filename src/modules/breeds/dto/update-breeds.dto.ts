import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { CreateBreedsDTO } from "./create-breeds.dto";

export class UpdateBreedsDTO extends CreateBreedsDTO {
  @ApiProperty()
  @Type(() => Number)
  id: number;
}
