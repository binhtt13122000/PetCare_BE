import { ApiProperty, ApiPropertyOptional, OmitType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { Min, Max, IsOptional, IsEnum } from "class-validator";
import { PageOptionsDto } from "src/common/page-options.dto";
import { GenderEnum, PostEnum, PostOrderName, ServiceEnum } from "src/enum";

export class PostsOptionDto extends OmitType(PageOptionsDto, ["filtering"]) {
  @ApiPropertyOptional({
    enum: PostOrderName,
    default: PostOrderName.CREATETIME,
  })
  @IsEnum(PostOrderName)
  @IsOptional()
  orderName?: PostOrderName;

  @ApiPropertyOptional({ enum: PostEnum, default: PostEnum.PUBLISHED })
  @IsEnum(PostEnum)
  @IsOptional()
  status?: PostEnum;

  @ApiPropertyOptional({
    enum: ServiceEnum,
    default: null,
  })
  @IsEnum(ServiceEnum)
  @IsOptional()
  type?: ServiceEnum;

  @ApiPropertyOptional({
    enum: GenderEnum,
    // default: GenderEnum.MALE,
  })
  @IsEnum(GenderEnum)
  @IsOptional()
  gender?: GenderEnum;

  @ApiProperty({ required: false, default: null })
  isSeed?: boolean;

  @ApiPropertyOptional({
    minimum: 0,
    maximum: 99999999,
    // default: 1000000,
  })
  @Type(() => Number)
  @Min(0)
  @Max(99999999)
  @IsOptional()
  price?: number;

  @ApiProperty({ required: false })
  breedName?: string;

  @ApiPropertyOptional({
    minimum: 0,
    maximum: 20,
    // default: 1,
  })
  ageRangeFrom?: number;

  @ApiPropertyOptional({
    minimum: 0,
    maximum: 20,
    // default: 10,
  })
  ageRangeTo?: number;

  @ApiProperty({ required: false })
  @Type(() => Number)
  customerId: number;

  @ApiProperty({ required: false })
  @Type(() => Number)
  notCustomerId?: number;
}
