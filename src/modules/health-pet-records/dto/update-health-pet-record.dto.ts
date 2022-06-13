import { ApiProperty } from "@nestjs/swagger";
import { CreateHealthPetRecordDTO } from "./create-health-pet-record.dto";

export class UpdateHealthPetRecordDTO extends CreateHealthPetRecordDTO {
  @ApiProperty()
  id: number;
}
