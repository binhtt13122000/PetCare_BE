import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsPhoneNumber } from "class-validator";
import { GenderEnum } from "src/enum";

export class CreateCustomerDTO {
  @ApiProperty()
  @IsPhoneNumber()
  phoneNumber: string;

  @ApiProperty({ required: false })
  @IsString()
  password: string;

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
}
