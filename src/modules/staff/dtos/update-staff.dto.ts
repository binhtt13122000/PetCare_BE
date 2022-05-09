import { CreateStaffDTO } from "./create-staff.dto";
import { ApiProperty } from "@nestjs/swagger";
export class UpdateStaffDTO extends CreateStaffDTO {
  @ApiProperty()
  id: number;
  @ApiProperty({ required: false })
  avatar: string;
  @ApiProperty({ type: "string", format: "binary", required: false })
  files: Express.Multer.File;
}
