import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Account } from "src/entities/account.entity";
import { UserService } from "../users/user.service";
import { HasuraRole } from "./auth.controller";
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
    hasuraRole: HasuraRole,
  ): Promise<{
    accessToken: string;
    user: Account;
  }> {
    const payload = {
      user,
      hasuraRole,
    };
    return {
      accessToken: await this.jwtService.signAsync(payload),
      user: user,
    };
  }
}
