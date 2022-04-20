import { ApiProperty } from "@nestjs/swagger";
import { Account } from "src/entities/authenticate_service/account.entity";
import { Customer } from "src/entities/user_management_service/customer.entity";
import { Staff } from "src/entities/user_management_service/staff.entity";
import { LoginStatusEnum, RoleEnum } from "src/enum";

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
}
