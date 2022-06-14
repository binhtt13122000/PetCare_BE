import { ApiProperty } from "@nestjs/swagger";
import { PostEnum } from "src/enum";
export class ChangeStatusPostDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  reasonReject?: string;

  @ApiProperty()
  status: PostEnum;
}
