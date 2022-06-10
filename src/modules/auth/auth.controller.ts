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
  Put,
  NotFoundException,
} from "@nestjs/common";
import * as firebase from "firebase-admin";
import { AuthService } from "./auth.service";
import { getFirestore } from "firebase-admin/firestore";
import {
  AccessTokenDTO,
  ChangePasswordDTO,
  ChangePasswordWithNotLoginDTO,
  CheckPhoneNumberExistDTO,
  LoginBodyWithPasswordDTO,
  LoginResponseDTO,
  ProfileResponseDTO,
  RefreshTokenBodyDTO,
  UserRegisterDTO,
} from "./auth.dto";
import { BranchesService } from "../branches/branches.service";
import { CustomerService } from "../customer/customer.service";
import { Branch } from "src/entities/user_management_service/branch.entity";
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
import { Customer } from "src/entities/user_management_service/customer.entity";
import { NotificationProducerService } from "src/shared/notification/notification.producer.service";
import { LoginBodyWithPhoneNumberDTO, Tokens } from "./auth.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Controller("auth")
@ApiTags("authenticate")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private notificationProducerService: NotificationProducerService,
    private branchService: BranchesService,
    private customerService: CustomerService,
    private userService: UserService,
    private readonly jwtService: JwtService,
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

  @Get("profile/:accessToken")
  async getProfileByAccessToken(
    @Param() param: AccessTokenDTO,
  ): Promise<ProfileResponseDTO> {
    try {
      const decoded = this.jwtService.decode(param.accessToken) as {
        sub: number;
        phoneNumber: string;
      };
      const user = await this.userService.getOneById(decoded.sub);
      if (!user) {
        throw new NotFoundException("Can not found user!");
      }
      if (user.phoneNumber !== decoded.phoneNumber) {
        throw new BadRequestException();
      }
      if (user?.role?.name) {
        let informationUser: Customer | Branch | undefined;
        switch (user.role.name) {
          case RoleEnum.CUSTOMER:
            informationUser = await this.customerService.findByPhoneNumber(
              user.phoneNumber,
            );
            break;
          case RoleEnum.BRANCH_MANAGER:
            informationUser = await this.branchService.findByPhoneNumber(
              user.phoneNumber,
            );
          default:
            break;
        }
        return {
          user: user,
          information: informationUser,
        };
      }
      throw new NotFoundException("Can not found information user!");
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get("phone-number/:phoneNumber")
  async isExistPhoneNumber(
    @Param() param: CheckPhoneNumberExistDTO,
  ): Promise<boolean> {
    try {
      const user = await this.authService.validateUser(param.phoneNumber);
      return !!user;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Post("register")
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("file"))
  async register(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: UserRegisterDTO,
  ): Promise<LoginResponseDTO> {
    try {
      const auth = await firebase.auth().verifyIdToken(data.accessToken);
      const phoneNumber = auth.phone_number;
      const user = await this.authService.validateUser(phoneNumber);
      if (user) {
        throw new HttpException("Existed!", HttpStatus.BAD_REQUEST);
      }

      const createdAccount: Account = await this.userService.store(
        new Account({
          password: null,
          currentHashedRefreshToken: null,
          phoneNumber: phoneNumber,
          isActive: true,
          roleId: RoleIndexEnum.CUSTOMER,
          registerTime: data.registerTime,
        }),
      );
      let avatar = null;
      if (file) {
        const { url } = await uploadService.uploadFile(file);
        avatar = url;
      }
      const createdCustomer = await this.customerService.store(
        new Customer({
          ...data,
          avatar,
          isActive: true,
          phoneNumber: phoneNumber,
        }),
      );
      createdAccount.password = null;
      const payload = await this.authService.generateJwtToken(
        phoneNumber,
        createdAccount.id,
      );
      await getFirestore().collection("fcm").doc().set({
        id: createdAccount.id,
        fcm: data.fcmToken,
      });
      return {
        ...payload,
        status: LoginStatusEnum.SUCCESS,
        information: createdCustomer,
        user: createdAccount,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Put("change-password")
  async changePassword(@Body() body: ChangePasswordDTO): Promise<Account> {
    try {
      if (body.newPassword !== body.confirmPassword) {
        throw new HttpException(
          "Password and confirm password are not equal",
          HttpStatus.BAD_REQUEST,
        );
      }
      const user = await this.authService.validateUserByPassword(
        body.phoneNumber,
        body.oldPassWord,
      );
      if (!user) {
        throw new HttpException("Password is wrong!", HttpStatus.BAD_REQUEST);
      }
      user.password = await bcrypt.hash(body.newPassword, 12);
      const updatedUser = await this.userService.update(user.id, user);
      updatedUser.password = null;
      return updatedUser;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Put("change-password-not-login")
  async changePasswordWithNotLogin(
    @Body() body: ChangePasswordWithNotLoginDTO,
  ): Promise<Account> {
    try {
      if (body.newPassword !== body.confirmPassword) {
        throw new HttpException(
          "Password and confirm password are not equal",
          HttpStatus.BAD_REQUEST,
        );
      }
      const auth = await firebase.auth().verifyIdToken(body.accessToken);
      const phoneNumber = auth.phone_number;
      const user = await this.authService.validateUser(phoneNumber);
      if (!user) {
        throw new HttpException("Authentication fail!", HttpStatus.BAD_REQUEST);
      }
      user.password = await bcrypt.hash(body.newPassword, 12);
      const updatedUser = await this.userService.update(user.id, user);
      updatedUser.password = null;
      return updatedUser;
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
            let information: Branch = null;
            if (data.role === RoleEnum.BRANCH_MANAGER) {
              information = await this.branchService.findByPhoneNumber(
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

  @Post("refresh")
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
