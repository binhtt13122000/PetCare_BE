import { ApiProperty } from "@nestjs/swagger";
import { ComboService } from "src/entities/service/combo-service.entity";
import { ComboTypeEnum } from "src/enum";

export class CreateComboDTO {
  @ApiProperty()
  name: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  description: string;
  @ApiProperty()
  isActive: boolean;
  @ApiProperty({ type: "enum", enum: ComboTypeEnum })
  type: ComboTypeEnum;
  @ApiProperty()
  comboServices: Partial<ComboService[]>;
}
