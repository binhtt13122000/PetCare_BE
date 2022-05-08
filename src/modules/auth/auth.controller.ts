import {
  BadRequestException,
  Body,
  Controller,
  UseInterceptors,
  UploadedFile,
  Get,
  HttpCode,
  Param,
  Post,
  Res,
  Response,
} from "@nestjs/common";
import * as firebase from "firebase-admin";
import { AuthService } from "./auth.service";
import { getFirestore } from "firebase-admin/firestore";
import {
  LoginBodyWithPasswordDTO,
  LoginResponseDTO,
  RefreshTokenBodyDTO,
  UserRegisterDTO,
} from "./auth.dto";
import { StaffService } from "../staff/staff.service";
import { CustomerService } from "../customer/customer.service";
import { Staff } from "src/entities/user_management_service/staff.entity";
import { LoginStatusEnum, RoleEnum, RoleIndexEnum } from "src/enum";
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiConsumes,
} from "@nestjs/swagger";
import { IdParams } from "src/common";
import { Account } from "src/entities/authenticate_service/account.entity";
import { FileInterceptor } from "@nestjs/platform-express";
import { uploadService } from "src/external/uploadFile.service";
import { UserService } from "../users/user.service";
import { HttpStatus, HttpException } from "@nestjs/common";
import { Tokens } from "./types";
import { Customer } from "src/entities/user_management_service/customer.entity";
import { NotificationProducerService } from "src/shared/notification/notification.producer.service";
import { LoginBodyWithPhoneNumberDTO } from "./auth.dto";
import * as bcrypt from "bcrypt";

@Controller("auth")
@ApiTags("authenticate")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private notificationProducerService: NotificationProducerService,
    private staffService: StaffService,
    private customerService: CustomerService,
    private userService: UserService,
  ) {}

  @Post("demo-noti")
  async sendNoti(): Promise<string> {
    await this.notificationProducerService.sendMessage(
      {
        body: "Hello",
        title: "Hello",
      },
      0,
    );
    return "ok";
  }

  @Post("register")
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("file"))
  async register(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: UserRegisterDTO,
  ): Promise<Account> {
    try {
      const { url: avatar } = await uploadService.uploadFile(file);
      if (data.password !== data.conFirmPassword) {
        throw new HttpException(
          "Password and confirm password are not equal",
          HttpStatus.BAD_REQUEST,
        );
      }
      data.password = await bcrypt.hash(data.password, 12);

      const createdAccount: Account = await this.userService.store(
        new Account({
          password: data.password,
          currentHashedRefreshToken: null,
          phoneNumber: data.phoneNumber,
          isActive: true,
          roleId: RoleIndexEnum.CUSTOMER,
        }),
      );
      await this.customerService.store(
        new Customer({ ...data, avatar, isActive: true }),
      );
      createdAccount.password = null;
      return createdAccount;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Post("login/phone-number")
  @ApiOkResponse({ type: LoginResponseDTO })
  @HttpCode(200)
  async loginWithPhoneNumber(
    @Body() data: LoginBodyWithPhoneNumberDTO,
  ): Promise<LoginResponseDTO> {
    if (data !== null) {
      try {
        const auth = await firebase.auth().verifyIdToken(data.accessToken);
        const phoneNumber = auth.phone_number;
        const account = await this.authService.validateUser(phoneNumber);
        if (account) {
          if (account.isActive) {
            if (account.role.name !== RoleEnum.CUSTOMER) {
              return {
                status: LoginStatusEnum.UNAUTHORIZED,
              };
            }
            await getFirestore().collection("fcm").doc().set({
              id: account.id,
              fcm: data.fcmToken,
            });
            const information = await this.customerService.findByPhoneNumber(
              account.phoneNumber,
            );
            const payload = await this.authService.generateJwtToken(
              account.phoneNumber,
              account.id,
            );
            return {
              ...payload,
              information: information,
              user: account,
              status: LoginStatusEnum.SUCCESS,
            };
          } else {
            return {
              status: LoginStatusEnum.BANNED,
            };
          }
        } else {
          return {
            status: LoginStatusEnum.NEWER,
          };
        }
      } catch (error) {
        throw new BadRequestException(error);
      }
    } else {
      throw new BadRequestException();
    }
  }

  @Post("login")
  @ApiOkResponse({ type: LoginResponseDTO })
  @HttpCode(200)
  async login(
    @Body() data: LoginBodyWithPasswordDTO,
  ): Promise<LoginResponseDTO> {
    if (data !== null) {
      try {
        const account = await this.authService.validateUserByPassword(
          data.phoneNumber,
          data.password,
        );
        if (account) {
          if (account.isActive) {
            if (account.role.name !== data.role) {
              return {
                status: LoginStatusEnum.UNAUTHORIZED,
              };
            }
            await getFirestore().collection("fcm").doc().set({
              id: account.id,
              fcm: data.fcmToken,
            });
            let information: Customer | Staff = null;
            if (data.role === RoleEnum.CUSTOMER) {
              information = await this.customerService.findByPhoneNumber(
                account.phoneNumber,
              );
            } else if (data.role === RoleEnum.STAFF) {
              information = await this.staffService.findByPhoneNumber(
                account.phoneNumber,
              );
            }
            const payload = await this.authService.generateJwtToken(
              account.phoneNumber,
              account.id,
            );
            return {
              ...payload,
              information: information,
              user: account,
              status: LoginStatusEnum.SUCCESS,
            };
          } else {
            return {
              status: LoginStatusEnum.BANNED,
            };
          }
        } else {
          return {
            status: LoginStatusEnum.UNAUTHENTICATED,
          };
        }
      } catch (error) {
        throw new BadRequestException(error);
      }
    } else {
      throw new BadRequestException();
    }
  }

  @Post("/refresh")
  @ApiOperation({ description: "Get AccessToken from RefreshToken" })
  @HttpCode(200)
  refresh(@Body() body: RefreshTokenBodyDTO): Promise<Tokens> {
    return this.authService.refreshTokens(body.refreshToken);
  }

  @Get("logout/:id")
  @ApiOperation({ description: "Logout" })
  @HttpCode(200)
  async logout(@Res() res: Response, @Param() query: IdParams): Promise<void> {
    await this.authService.removeRefreshToken(query.id);
    res.headers.set("Authorization", null);
  }
}
