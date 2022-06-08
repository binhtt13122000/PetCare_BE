import { CreateComboDTO } from "./create-combo.dto";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateComboDTO extends CreateComboDTO {
  @ApiProperty()
  id: number;

  @ApiProperty({ required: false, isArray: true })
  deletedIds: number[];
}
