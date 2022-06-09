import { CustomDecorator, SetMetadata } from "@nestjs/common";

export const hasRoles = (...hasRoles: string[]): CustomDecorator<string> =>
  SetMetadata("roles", hasRoles);
