import { GenderEnum } from "src/enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateStaffDTO {
  @ApiProperty({ required: false })
  email: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  phoneNumber: string;
  @ApiProperty({ required: false })
  address: string;
  @ApiProperty({ enum: GenderEnum })
  gender: GenderEnum;
  @ApiProperty()
  accountId: number;
  @ApiProperty({ type: "string", format: "binary" })
  files: Express.Multer.File;
}
