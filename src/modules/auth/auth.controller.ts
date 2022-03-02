import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Request,
  UnauthorizedException,
} from "@nestjs/common";
import * as firebase from "firebase-admin";
import { ServiceAccount } from "firebase-admin";
import { Account } from "src/entities/account.entity";
import { AuthService } from "./auth.service";
import firebase_admin_config from "../../keys/firebase_admin_sdk.json";
import _ from "lodash";

type HasuraRole = {
  "https://hasura.io/jwt/claims": {
    "x-hasura-default-role": number;
    "x-hasura-allowed-roles": number[];
    "x-hasura-user-id": number;
  };
  audience?: string;
  issuer?: string;
};
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
        user?: Account & HasuraRole;
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
            const signedUser: Partial<Account> & HasuraRole = {
              ...payload,
              "https://hasura.io/jwt/claims": {
                "x-hasura-default-role": account.roleId,
                "x-hasura-allowed-roles": [account.roleId],
                "x-hasura-user-id": account.id,
              },
              audience: "pet-store-storybook",
              issuer: "pet-store-storybook-backend",
            };
            return {
              ...signedUser,
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
