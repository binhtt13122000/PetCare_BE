import { ApiProperty, OmitType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt } from "class-validator";
import { CreatePetDTO } from "./create-pet.dto";
export class UpdatePetDTO extends OmitType(CreatePetDTO, ["ownerId"] as const) {
  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  id: number;

  @ApiProperty()
  avatar: string;
}
