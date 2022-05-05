import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, Length } from "class-validator";
import { CreateCustomerProfileDTO } from "./create-customer.dto";

export class UpdateCustomerProfileDTO extends CreateCustomerProfileDTO {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  @IsInt()
  star: number;

  @ApiProperty()
  @IsInt()
  point: number;

  @ApiProperty()
  @IsInt()
  numberFollowers: number;

  @ApiProperty()
  @IsInt()
  numberReviewers: number;

  @ApiProperty()
  @IsString()
  @Length(0, 8)
  bankName: string;

  @ApiProperty()
  @IsString()
  @Length(0, 32)
  bankCode: string;

  @ApiProperty()
  @IsString()
  @Length(0, 32)
  bankBranch: string;
}
