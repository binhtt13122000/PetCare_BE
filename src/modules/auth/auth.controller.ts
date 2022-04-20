import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
} from "@nestjs/common";
import * as firebase from "firebase-admin";
import { AuthService } from "./auth.service";
import _ from "lodash";
import { NotificationProducerService } from "../../shared/notification.producer/notification.producer.service";
import { getFirestore } from "firebase-admin/firestore";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { LoginBodyDTO, LoginResponseDTO } from "./auth.dto";
import { StaffService } from "../staff/staff.service";
import { CustomerService } from "../customer/customer.service";
import { Staff } from "src/entities/user_management_service/staff.entity";
import { Customer } from "../../entities/user_management_service/customer.entity";
import { LoginStatusEnum, RoleEnum } from "src/enum";

@Controller("auth")
@ApiTags("authenticate")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private notificationProducerService: NotificationProducerService,
    private staffService: StaffService,
    private customerService: CustomerService,
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

  @Post("login")
  @ApiCreatedResponse({ type: LoginResponseDTO })
  async login(
    @Body() data: LoginBodyDTO,
  ): Promise<LoginResponseDTO | UnauthorizedException> {
    let phoneNumber: string;
    if (data !== null && !_.isEmpty(data)) {
      try {
        const auth = await firebase.auth().verifyIdToken(data.accessToken);
        phoneNumber = auth.phone_number;
        const account = await this.authService.validateUser(phoneNumber);
        if (!_.isEmpty(account)) {
          if (account.isActive) {
            if (account.roleId !== data.loginType) {
              return {
                status: LoginStatusEnum.UNAUTHORIZED,
              };
            }
            // const payload = await this.authService.generateJwtToken(account);
            await getFirestore().collection("fcm").doc().set({
              id: account.id,
              fcm: data.fcmToken,
            });
            let information: Customer | Staff = null;
            if (data.role === RoleEnum.CUSTOMER) {
              information = await this.customerService.findByAccountId(
                account.id,
              );
            } else if (data.role === RoleEnum.STAFF) {
              information = await this.staffService.findByAccountId(account.id);
            }
            return {
              user: account,
              information: information,
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
        return new UnauthorizedException(error);
      }
    } else {
      return new BadRequestException();
    }
  }

  @Post("register")
  async register(
    @Body() data: LoginBodyDTO,
  ): Promise<LoginResponseDTO | UnauthorizedException> {
    let phoneNumber: string;
    if (data !== null && !_.isEmpty(data)) {
      try {
        const auth = await firebase.auth().verifyIdToken(data.accessToken);
        phoneNumber = auth.phone_number;
        const account = await this.authService.validateUser(phoneNumber);
        if (!_.isEmpty(account)) {
          if (account.isActive) {
            if (account.roleId !== data.loginType) {
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
              information = await this.customerService.findByAccountId(
                account.id,
              );
            } else if (data.role === RoleEnum.STAFF) {
              information = await this.staffService.findByAccountId(account.id);
            }
            const payload = await this.authService.generateJwtToken(
              account,
              information,
            );
            return {
              ...payload,
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
        return new UnauthorizedException(error);
      }
    } else {
      return new BadRequestException();
    }
  }
}
