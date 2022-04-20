import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Account } from "src/entities/authenticate_service/account.entity";
import { UserService } from "../users/user.service";
import { Staff } from "../../entities/user_management_service/staff.entity";
import { Customer } from "src/entities/user_management_service/customer.entity";
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(phoneNumber: string): Promise<Account | null> {
    const user = await this.userService.findByPhoneNumber(phoneNumber);

    return user;
  }

  async generateJwtToken(
    user: Account,
    information: Staff | Customer,
  ): Promise<{
    accessToken: string;
    user: Account;
    information: Staff | Customer;
  }> {
    const payload = {
      user,
    };
    return {
      accessToken: await this.jwtService.signAsync(payload),
      user: user,
      information: information,
    };
  }
}
