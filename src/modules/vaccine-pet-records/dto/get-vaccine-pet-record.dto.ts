import { ApiProperty } from "@nestjs/swagger";

export default class GetVaccinePerRecordQuery {
  @ApiProperty({ required: false, default: null })
  petId?: number;
}
