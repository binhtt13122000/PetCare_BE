import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Account } from "src/entities/authenticate_service/account.entity";
import { UserService } from "../users/user.service";
import * as bcrypt from "bcrypt";
import { AuthPayloadDTO, Tokens } from "./auth.dto";
import { RoleIndexEnum } from "src/enum/index";
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(phoneNumber: string): Promise<Account | null> {
    const user = await this.userService.validate(phoneNumber);

    return user;
  }

  async validateUserWithRole(
    phoneNumber: string,
    role?: RoleIndexEnum,
  ): Promise<Account | null> {
    const user = await this.userService.validate(phoneNumber);
    if (!user) {
      return null;
    }
    if (!role) {
      return user;
    }
    if (user.roleId === Number(RoleIndexEnum[role])) {
      return user;
    }
    return null;
  }

  async validateUserByPassword(
    phoneNumber: string,
    password: string,
  ): Promise<Account | null> {
    const user = await this.userService.validate(phoneNumber);
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }

  async generateJwtToken(phoneNumber: string, userId: number): Promise<Tokens> {
    const payload: AuthPayloadDTO = {
      sub: userId,
      phoneNumber,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get("REFRESH_TOKEN_SECRET"),
        expiresIn: `${this.configService.get("REFRESH_TOKEN_EXPIRATION")}`,
      }),
    ]);

    await this.setCurrentRefreshToken(rt, userId);
    return {
      accessToken: at,
      refreshToken: rt,
    };
  }

  async removeRefreshToken(id: number): Promise<Account> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new HttpException(
        "User with this id does not exist",
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.userService.update(user.id, {
      ...user,
      currentHashedRefreshToken: null,
    });
  }

  async setCurrentRefreshToken(
    refreshToken: string,
    userId: number,
  ): Promise<Account> {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 12);
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new HttpException(
        "User with this id does not exist",
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.userService.update(userId, {
      ...user,
      currentHashedRefreshToken,
    });
  }

  async refreshTokens(refreshToken: string): Promise<Tokens> {
    try {
      const decoded = this.jwtService.decode(refreshToken) as {
        sub: number;
      };
      if (!decoded) {
        throw new Error();
      }
      const user = await this.userService.findById(decoded.sub);
      if (!user || !user.currentHashedRefreshToken) {
        throw new ForbiddenException("Access Denied");
      }
      const isRefreshTokenMatching = await bcrypt.compare(
        refreshToken,
        user.currentHashedRefreshToken,
      );
      if (!isRefreshTokenMatching) {
        throw new UnauthorizedException("Invalid token");
      }
      //sẽ xem lại flow này sau
      await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get("REFRESH_TOKEN_SECRET"),
      });
      const tokens = await this.generateJwtToken(user.phoneNumber, user.id);
      await this.setCurrentRefreshToken(tokens.refreshToken, user.id);
      return tokens;
    } catch {
      throw new UnauthorizedException("Invalid token");
    }
  }
}
