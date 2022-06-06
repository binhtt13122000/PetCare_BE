import { ApiProperty } from "@nestjs/swagger";

export class CreateComboDTO {
  @ApiProperty()
  price: number;
  @ApiProperty()
  description: string;
  @ApiProperty()
  isActive: boolean;
  @ApiProperty()
  comboServices: ComboServiceDTO[];
}

export class ComboServiceDTO {
  @ApiProperty()
  comboId: number;
  @ApiProperty()
  serviceId: number;
  @ApiProperty()
  priority: number;
  @ApiProperty()
  nextEvent: number;
}
