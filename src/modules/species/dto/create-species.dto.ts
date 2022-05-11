import { ApiProperty } from "@nestjs/swagger";

import { IsBoolean, IsString } from "class-validator";

export class CreateSpeciesDTO {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  description: string;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty()
  @IsBoolean()
  isBreeding: boolean;

  @ApiProperty()
  @IsBoolean()
  isInject: boolean;
}
