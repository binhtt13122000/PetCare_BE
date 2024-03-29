import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Account } from "src/entities/authenticate_service/account.entity";
import { Customer } from "src/entities/user_management_service/customer.entity";
import { Branch } from "src/entities/user_management_service/branch.entity";
import { GenderEnum, LoginStatusEnum, RoleEnum, RoleIndexEnum } from "src/enum";

export class LoginBodyWithPhoneNumberDTO {
  @ApiProperty({ required: true, description: "Access token from Firebase" })
  accessToken: string;
  @ApiProperty({ required: true, description: "device's FCM token" })
  fcmToken: string;
}

export class LoginBodyWithPasswordDTO {
  @ApiProperty({ required: true, description: "Phone Number" })
  phoneNumber: string;
  @ApiProperty({ required: true, description: "Password" })
  password: string;
  @ApiProperty({ required: true, description: "device's FCM token" })
  fcmToken: string;
  @ApiProperty({ enum: RoleEnum })
  role: RoleEnum;
}

export class LogoutDTO {
  @ApiProperty({ required: true })
  id: number;
  @ApiProperty({ required: true, description: "device's FCM token" })
  fcmToken: string;
}

export class LoginResponseDTO {
  @ApiProperty()
  user?: Partial<Account>;
  @ApiProperty()
  information?: Branch | Customer;
  @ApiProperty({ enum: LoginStatusEnum })
  status: LoginStatusEnum;
  @ApiProperty()
  token?: string;
  @ApiProperty()
  refreshToken?: string;
}

export class ProfileResponseDTO {
  @ApiProperty()
  user?: Partial<Account>;
  @ApiProperty()
  information?: Branch | Customer;
}

export class UserRegisterDTO {
  @ApiProperty()
  email: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  fcmToken: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  gender: GenderEnum;

  @ApiProperty({ type: "string", format: "binary" })
  file: Express.Multer.File;

  @ApiProperty()
  dateOfBirth: Date;

  @ApiProperty()
  registerTime: Date;
}

export class RefreshTokenBodyDTO {
  @ApiProperty()
  refreshToken: string;
}

export class AccessTokenDTO {
  @ApiProperty()
  accessToken: string;
}

export class ChangePasswordDTO {
  @ApiProperty()
  phoneNumber: string;
  @ApiProperty()
  oldPassWord: string;
  @ApiProperty()
  newPassword: string;
  @ApiProperty()
  confirmPassword: string;
}

export class ChangePasswordWithNotLoginDTO {
  @ApiProperty()
  accessToken: string;
  @ApiProperty()
  newPassword: string;
  @ApiProperty()
  confirmPassword: string;
}

export class CheckPhoneNumberExistDTO {
  @ApiProperty()
  phoneNumber: string;
  @ApiProperty({ required: false, enum: RoleIndexEnum })
  role?: RoleIndexEnum;
}

export class AuthPayloadDTO {
  sub: number;
  phoneNumber: string;
}

export class ConvertAuthPayloadDTO {
  userId: number;
  phoneNumber: string;
}

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type LogoutResponse = {
  status: string;
};
