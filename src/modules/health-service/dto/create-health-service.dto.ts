import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class HealthServiceDTO {
  @ApiProperty({ type: "string", format: "binary", required: false })
  file: Express.Multer.File;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  serviceId: number;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsString()
  petStatus: string;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  healthRecordId: number;
}
