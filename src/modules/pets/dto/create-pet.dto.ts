import { GenderEnum, PetEnum } from "src/enum";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsBoolean } from "class-validator";
import { Type } from "class-transformer";
export class CreatePetDTO {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  dob: Date;

  @ApiProperty({ enum: GenderEnum })
  gender: GenderEnum;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  isSeed: boolean;

  @ApiProperty({ enum: PetEnum })
  status: PetEnum;

  @ApiProperty()
  @IsString()
  color: string;

  @ApiProperty()
  @Type(() => Number)
  @Type(() => Number)
  breedId: number;

  @ApiProperty()
  @Type(() => Number)
  @Type(() => Number)
  ownerId: number;

  @ApiProperty({ type: "string", format: "binary" })
  file: Express.Multer.File;
}
