import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, Length, IsEmail } from "class-validator";
import { GenderEnum } from "src/enum";

export class UpdateCustomerDTO {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsString()
  @Length(0, 16)
  firstName: string;

  @ApiProperty()
  @IsString()
  @Length(0, 16)
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Length(0, 64)
  address: string;

  @ApiProperty({ enum: GenderEnum })
  gender: GenderEnum;

  @ApiProperty({ type: "string", format: "binary" })
  file: Express.Multer.File;

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  @IsInt()
  star: number;

  @ApiProperty()
  @IsInt()
  point: number;

  @ApiProperty()
  @IsInt()
  numberFollowers: number;

  @ApiProperty()
  @IsInt()
  numberReviewers: number;

  @ApiProperty()
  @IsString()
  @Length(0, 8)
  bankName: string;

  @ApiProperty()
  @IsString()
  @Length(0, 32)
  bankCode: string;

  @ApiProperty()
  @IsString()
  @Length(0, 32)
  bankBranch: string;
}
