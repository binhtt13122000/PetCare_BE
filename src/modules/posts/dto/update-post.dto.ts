import { ApiProperty } from "@nestjs/swagger";
import { CreatePostDTO } from "./create-post.dto";
import { IsDate } from "class-validator";
import { PostEnum, ServiceEnum } from "src/enum";
import { Media } from "src/entities/transaction_service/media.entity";
export class UpdatePostDTO extends CreatePostDTO {
  @ApiProperty()
  id: number;

  @ApiProperty({ required: false })
  @IsDate()
  approveTime: Date;

  @ApiProperty({ required: false })
  @IsDate()
  cancelTime: Date;

  @ApiProperty({ required: false })
  @IsDate()
  rejectTime: Date;

  @ApiProperty()
  type: ServiceEnum;

  @ApiProperty()
  @IsDate()
  description: string;

  @ApiProperty()
  status: PostEnum;

  @ApiProperty({ required: false })
  reasonCancel: string;

  @ApiProperty({ required: false })
  reasonReject: string;

  @ApiProperty()
  medias: Media[];
}
