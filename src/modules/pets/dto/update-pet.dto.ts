import { ApiProperty, OmitType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { CreatePetDTO } from "./create-pet.dto";
export class UpdatePetDTO extends OmitType(CreatePetDTO, ["ownerId"] as const) {
  @ApiProperty()
  @Type(() => Number)
  id: number;
}
