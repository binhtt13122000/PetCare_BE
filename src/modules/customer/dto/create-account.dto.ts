import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class CreateAccountDTO {
  @ApiProperty()
  @IsString()
  phoneNumber: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsInt()
  roleId: number;

  @ApiProperty()
  isActive: boolean;
}
