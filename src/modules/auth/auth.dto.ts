import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  Length,
  IsDate,
} from "class-validator";
import { Account } from "src/entities/authenticate_service/account.entity";
import { Customer } from "src/entities/user_management_service/customer.entity";
import { Staff } from "src/entities/user_management_service/staff.entity";
import { GenderEnum, LoginStatusEnum, RoleEnum } from "src/enum";

export class LoginBodyDTO {
  @ApiProperty()
  accessToken: string;
  @ApiProperty()
  loginType: number;
  @ApiProperty()
  fcmToken: string;
  @ApiProperty({ enum: RoleEnum })
  role: RoleEnum;
}

export class LoginResponseDTO {
  @ApiProperty()
  user?: Partial<Account>;
  // @ApiProperty({
  //   oneOf: [{ $ref: getSchemaPath(Staff) }, { $ref: getSchemaPath(Customer) }],
  // })
  @ApiProperty()
  information?: Staff | Customer;
  @ApiProperty({ enum: LoginStatusEnum })
  status: LoginStatusEnum;
  @ApiProperty()
  token?: string;
  @ApiProperty()
  refreshToken?: string;
}

export class UserRegisterDTO {
  @ApiProperty()
  @IsEmail()
  email: string;

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
  @IsString()
  @Length(0, 64)
  address: string;

  @ApiProperty()
  gender: GenderEnum;

  @ApiProperty({ type: "string", format: "binary" })
  file: Express.Multer.File;

  @ApiProperty()
  @IsDate()
  dateOfBirth: Date;

  @ApiProperty()
  roleId: number;

  @ApiProperty({ enum: RoleEnum })
  roleEnum: RoleEnum;
}

export class RefreshTokenBodyDTO {
  @ApiProperty()
  refreshToken: string;
}
