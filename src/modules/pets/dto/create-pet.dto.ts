import { GenderEnum, PetEnum } from "src/enum";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsInt, IsBoolean } from "class-validator";
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
  @IsBoolean()
  @Type(() => Boolean)
  isSeed: boolean;

  @ApiProperty({ enum: PetEnum })
  status: PetEnum;

  @ApiProperty()
  @IsString()
  color: string;

  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  breedId: number;

  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  ownerId: number;

  @ApiProperty()
  @IsString()
  specialMarkings: string;

  @ApiProperty()
  @IsString()
  vaccineDescription: string;

  @ApiProperty({ type: "string", format: "binary" })
  file: Express.Multer.File;
}
