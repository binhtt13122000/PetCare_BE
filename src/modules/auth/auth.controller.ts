import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { Response } from "express";
import * as firebase from "firebase-admin";
import { ServiceAccount } from "firebase-admin";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { Account } from "src/entities/account.entity";
import { AuthService } from "./auth.service";
import firebase_admin_config from "../../keys/firebase_admin_sdk.json";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { isEmpty } from "rxjs";
import _ from "lodash";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        credential: firebase.credential.cert(
          <ServiceAccount>firebase_admin_config,
        ),
      });
    }
  }

  // @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(
    @Request() req: Request,
    @Body() data: { accessToken: string; loginType: number },
  ): Promise<
    | {
        accessToken?: string;
        user?: Account;
        status: "SUCCESS" | "BANNED" | "NEWER" | "UNAUTHORIZED";
      }
    | UnauthorizedException
  > {
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
                status: "UNAUTHORIZED",
              };
            }
            const payload = await this.authService.generateJwtToken(account);
            return {
              ...payload,
              status: "SUCCESS",
            };
          } else {
            return {
              status: "BANNED",
            };
          }
        } else {
          return {
            status: "NEWER",
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
