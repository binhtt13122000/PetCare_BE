import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, Length } from "class-validator";
import { CreateCustomerDTO } from "./create-customer.dto";

export class UpdateCustomerDTO extends CreateCustomerDTO {
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
