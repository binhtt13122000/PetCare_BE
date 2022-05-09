import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsEmail } from "class-validator";
import { GenderEnum } from "src/enum";

export class CreateCustomerDTO {
  @ApiProperty()
  @IsString()
  phoneNumber: string;

  @ApiProperty()
  @IsString()
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

  @ApiProperty({ type: "string", format: "binary" })
  file: Express.Multer.File;
}
