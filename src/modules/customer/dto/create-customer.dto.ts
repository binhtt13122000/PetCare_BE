import { ApiProperty, OmitType, PickType } from "@nestjs/swagger";
import { IsInt, IsString, Length, IsEmail } from "class-validator";
import { GenderEnum } from "src/enum";
import { CreateAccountDTO } from "./create-account.dto";

export class CreateCustomerDTO extends PickType(CreateAccountDTO, [
  "password",
  "phoneNumber",
]) {
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

  @ApiProperty()
  avatar: string;
}
