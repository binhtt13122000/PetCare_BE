import { ApiProperty } from "@nestjs/swagger";
import { HealthPetRecordEnum } from "src/enum/index";

export default class GetHealthPerRecordQuery {
  @ApiProperty({ required: false, default: null })
  petId?: number;
  @ApiProperty({ required: false, default: null })
  type?: HealthPetRecordEnum;
}
