import { ApiProperty, OmitType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { CreateServiceDTO } from "./create-service.dto";

export class UpdateServiceDTO extends OmitType(CreateServiceDTO, [
  "price",
] as const) {
  @ApiProperty()
  @Type(() => Number)
  id: number;
}
