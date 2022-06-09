import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { RoleEnum } from "src/enum";
import { AuthPayloadDTO, ConvertAuthPayloadDTO } from "../auth.dto";
import { AuthService } from "../auth.service";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>("roles", context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: ConvertAuthPayloadDTO = request.user;
    const findUserByPhone = await this.authService.validateUser(
      user.phoneNumber,
    );
    if (!findUserByPhone) {
      return false;
    }
    return roles.indexOf(findUserByPhone.role.name || RoleEnum.CUSTOMER) > -1;
  }
}
