import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class HealthServiceDTO {
  // @ApiProperty({ type: "string", format: "binary" })
  // file: Express.Multer.File;

  @ApiProperty({ type: "array", items: { type: "string", format: "binary" } })
  files: Array<Express.Multer.File>;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  serviceId: number;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  price: number;

  @ApiProperty()
  contentOfHealthService: string;

  @ApiProperty()
  petStatusOfHealthService: string;
}