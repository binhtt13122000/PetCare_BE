import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";
import { CreateBreedsDTO } from "./create-breeds.dto";

export class UpdateBreedsDTO extends CreateBreedsDTO {
  @ApiProperty()
  @IsInt()
  id: number;
}
