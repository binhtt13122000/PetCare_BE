import { ApiProperty, OmitType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { PageOptionsDto } from "src/common/page-options.dto";

export class OrderOptionDto extends OmitType(PageOptionsDto, [
  "filtering",
  "orderType",
]) {
  @ApiProperty({ required: false })
  @Type(() => Number)
  customerId: number;

  @ApiProperty({ required: false })
  @Type(() => Number)
  orderId: number;
}
