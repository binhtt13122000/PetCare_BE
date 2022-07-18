import { ApiProperty } from "@nestjs/swagger";
import { CreatePostDTO } from "./create-post.dto";
import { PostEnum, ServiceEnum } from "src/enum";
export class UpdatePostDTO extends CreatePostDTO {
  @ApiProperty()
  id: number;

  @ApiProperty({ required: false })
  cancelTime: Date;

  @ApiProperty()
  type: ServiceEnum;

  @ApiProperty()
  description: string;

  @ApiProperty()
  status: PostEnum;

  @ApiProperty({ required: false })
  reasonCancel: string;

  @ApiProperty({ required: false })
  reasonReject: string;

  @ApiProperty({ required: false, isArray: true })
  deletedIds: number[];

  @ApiProperty()
  isVaccineInject: boolean;
}
