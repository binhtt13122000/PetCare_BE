import { GenderEnum, PetEnum } from "src/enum";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsDate, IsInt, IsBoolean } from "class-validator";
export class CreatePetDTO {
  @ApiProperty()
  @IsString()
  @Length(0, 32)
  name: string;

  @ApiProperty()
  dob: Date;

  @ApiProperty()
  @IsInt()
  ageRange: number;

  @ApiProperty({ enum: GenderEnum })
  gender: GenderEnum;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsBoolean()
  isSeed: boolean;

  @ApiProperty({ enum: PetEnum })
  status: PetEnum;

  @ApiProperty()
  @IsString()
  color: string;

  @ApiProperty()
  @IsInt()
  breedId: number;

  @ApiProperty()
  @IsInt()
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
