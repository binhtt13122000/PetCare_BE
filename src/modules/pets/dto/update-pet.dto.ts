import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";
import { CreatePetDTO } from "./create-pet.dto";
export class UpdatePetDTO extends CreatePetDTO {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  avatar: string;
}
