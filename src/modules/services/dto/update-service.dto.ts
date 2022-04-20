import { ApiProperty } from "@nestjs/swagger";
import { CreateServiceDTO } from "./create-service.dto";
import { IsInt } from "class-validator";
export class UpdateServiceDTO extends CreateServiceDTO {
  @ApiProperty()
  @IsInt()
  id: number;
}
