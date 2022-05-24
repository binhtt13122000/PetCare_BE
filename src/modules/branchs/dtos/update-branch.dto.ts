import { CreateBranchDTO } from "./create-branch.dto";
import { ApiProperty } from "@nestjs/swagger";
export class UpdateBranchDTO extends CreateBranchDTO {
  @ApiProperty()
  id: number;
  @ApiProperty({ required: false })
  image: string;
  @ApiProperty({ type: "string", format: "binary", required: false })
  file: Express.Multer.File;
  @ApiProperty({ required: false })
  isActive: boolean;
}
