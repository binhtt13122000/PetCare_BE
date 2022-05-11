import { ApiProperty } from "@nestjs/swagger";
import { CreatePostDTO } from "./create-post.dto";
import { PostEnum, ServiceEnum } from "src/enum";
import { Media } from "src/entities/transaction_service/media.entity";
export class UpdatePostDTO extends CreatePostDTO {
  @ApiProperty()
  id: number;

  @ApiProperty({ required: false })
  approveTime: Date;

  @ApiProperty({ required: false })
  cancelTime: Date;

  @ApiProperty({ required: false })
  rejectTime: Date;

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

  @ApiProperty()
  medias: Media[];

  @ApiProperty()
  isVaccineInject: boolean;
}
