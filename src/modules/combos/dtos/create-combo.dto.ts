import { ApiProperty } from "@nestjs/swagger";
import { ComboService } from "src/entities/service/combo-service.entity";

export class CreateComboDTO {
  @ApiProperty()
  name: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  description: string;
  @ApiProperty()
  isActive: boolean;
  @ApiProperty()
  comboServices: Partial<ComboService[]>;
}
