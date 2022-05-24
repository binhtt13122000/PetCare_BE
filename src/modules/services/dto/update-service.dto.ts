import { ApiProperty, OmitType } from "@nestjs/swagger";
import { CreateServiceDTO } from "./create-service.dto";
import { IsInt } from "class-validator";
export class UpdateServiceDTO extends OmitType(CreateServiceDTO, [
  "price",
] as const) {
  @ApiProperty()
  @IsInt()
  id: number;
}
