import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsEmail, IsPhoneNumber } from "class-validator";
import { GenderEnum } from "src/enum";

export class CreateCustomerDTO {
  @ApiProperty()
  @IsPhoneNumber()
  phoneNumber: string;

  @ApiProperty()
  @IsString()
  @Length(6, 15)
  password: string;

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

  @ApiProperty({ type: "string", format: "binary", required: false })
  file: Express.Multer.File;
}
