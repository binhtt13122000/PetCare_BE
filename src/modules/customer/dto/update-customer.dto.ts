import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

import { IsString, IsEmail, IsNumber } from "class-validator";
import { GenderEnum } from "src/enum";

export class UpdateCustomerDTO {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  id: number;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  address: string;

  @ApiProperty({ enum: GenderEnum })
  gender: GenderEnum;

  @ApiProperty({ type: "string", format: "binary" })
  file: Express.Multer.File;

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  @IsString()
  bankName: string;

  @ApiProperty()
  @IsString()
  bankCode: string;

  @ApiProperty()
  @IsString()
  bankBranch: string;
}
