import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";
import { CreateVaccineDTO } from "./create-vaccine.dto";
export class UpdateVaccineDTO extends CreateVaccineDTO {
  @ApiProperty()
  @IsInt()
  id: number;
}
