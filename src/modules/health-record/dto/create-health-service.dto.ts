import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNumber } from "class-validator";

export class HealthServiceDTO {
  @ApiProperty({ type: "string", format: "binary" })
  evidence: Express.Multer.File;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  healthRecordId: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  serviceId: number;

  @ApiProperty()
  @IsInt()
  price: number;

  @ApiProperty()
  content: string;

  @ApiProperty()
  petStatus: string;
}
