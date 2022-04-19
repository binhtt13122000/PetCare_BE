import { Account } from "src/entities/authenticate_service/account.entity";
import { Customer } from "src/entities/user_management_service/customer.entity";
import { Staff } from "src/entities/user_management_service/staff.entity";

export class LoginBodyDTO {
  accessToken: string;
  loginType: number;
  fcmToken: string;
  role: "STAFF" | "CUSTOMER";
}

export class LoginResponseDTO {
  user?: Partial<Account>;
  information?: Partial<Staff> | Partial<Customer>;
  status: "SUCCESS" | "BANNED" | "NEWER" | "UNAUTHORIZED";
}
