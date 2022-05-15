import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber } from "class-validator";
import { CreateVaccinePetRecordDTO } from "./create-vaccine-pet-record.dto";

export class UpdateVaccinePetRecordDTO extends CreateVaccinePetRecordDTO {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  id: number;
}
