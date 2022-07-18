import { ApiProperty } from "@nestjs/swagger";
import { required } from "joi";
import { PostEnum } from "src/enum";
export class ChangeStatusPostDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  reasonReject?: string;

  @ApiProperty()
  status: PostEnum;

  @ApiProperty({ required: false })
  rejectTime?: Date;
}
