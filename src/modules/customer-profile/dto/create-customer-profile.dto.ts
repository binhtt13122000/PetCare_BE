import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsInt,
  IsPhoneNumber,
  IsString,
  Length,
} from "class-validator";
import { GenderEnum } from "src/enum";

export class CreateCustomerProfileDTO {
  @ApiProperty()
  @IsString()
  @Length(0, 16)
  firstName: string;

  @ApiProperty()
  @IsString()
  @Length(0, 16)
  lastName: string;

  @ApiProperty()
  @IsPhoneNumber()
  phoneNumber: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Length(0, 64)
  address: string;

  @ApiProperty({ enum: GenderEnum })
  gender: GenderEnum;

  @ApiProperty()
  @IsInt()
  accountId: number;

  @ApiProperty({ type: "string", format: "binary" })
  file: Express.Multer.File;
}
