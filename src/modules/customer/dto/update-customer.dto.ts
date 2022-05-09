import { ApiProperty } from "@nestjs/swagger";
import { GenderEnum } from "src/enum";

export class UpdateCustomerDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  address: string;

  @ApiProperty({ enum: GenderEnum })
  gender: GenderEnum;

  @ApiProperty({ type: "string", format: "binary" })
  file: Express.Multer.File;

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  star: number;

  @ApiProperty()
  point: number;

  @ApiProperty()
  numberFollowers: number;

  @ApiProperty()
  numberReviewers: number;

  @ApiProperty()
  bankName: string;

  @ApiProperty()
  bankCode: string;

  @ApiProperty()
  bankBranch: string;
}
