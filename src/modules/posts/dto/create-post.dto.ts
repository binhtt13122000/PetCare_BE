import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { PostEnum, ServiceEnum } from "src/enum";

export class CreatePostDTO {
  @ApiProperty()
  @IsString()
  title: string;
  @ApiProperty()
  sellerReceive: number;
  @ApiProperty()
  shopFee: number;
  @ApiProperty()
  provisionalTotal: number;
  @ApiProperty()
  createTime: Date;
  @ApiProperty()
  meetingTime: Date;
  @ApiProperty({ enum: ServiceEnum })
  type: ServiceEnum;
  @ApiProperty()
  @IsString()
  description: string;
  @ApiProperty({ enum: PostEnum })
  status: PostEnum;
  @ApiProperty()
  petId: number;

  @ApiProperty()
  customerId: number;

  @ApiProperty({ type: "array", items: { type: "string", format: "binary" } })
  files: Array<Express.Multer.File>;
}
