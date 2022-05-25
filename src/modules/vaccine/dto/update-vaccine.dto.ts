import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { CreateVaccineDTO } from "./create-vaccine.dto";
export class UpdateVaccineDTO extends CreateVaccineDTO {
  @ApiProperty()
  @Type(() => Number)
  id: number;
}
