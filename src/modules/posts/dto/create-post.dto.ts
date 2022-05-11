import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsDate, IsString } from "class-validator";
import { PostEnum, ServiceEnum } from "src/enum";

export class CreatePostDTO {
  @ApiProperty()
  @IsString()
  title: string;
  @ApiProperty()
  @IsInt()
  sellerReceive: number;
  @ApiProperty()
  @IsInt()
  shopFee: number;
  @ApiProperty()
  @IsInt()
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
  @IsInt()
  petId: number;

  @ApiProperty()
  @IsInt()
  customerId: number;

  @ApiProperty({ type: "array", items: { type: "string", format: "binary" } })
  files: Array<Express.Multer.File>;
}
