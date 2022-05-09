import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsEmail, IsPhoneNumber } from "class-validator";
import { GenderEnum } from "src/enum";

export class CreateCustomerDTO {
  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  address: string;

  @ApiProperty({ enum: GenderEnum })
  gender: GenderEnum;

  @ApiProperty({ type: "string", format: "binary" })
  file: Express.Multer.File;
}
