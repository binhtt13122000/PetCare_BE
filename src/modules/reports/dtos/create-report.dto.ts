import { ReportEnum } from "src/enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateReportDTO {
  @ApiProperty()
  description: string;
  @ApiProperty()
  evidence: string;
  @ApiProperty({ enum: ReportEnum })
  type: ReportEnum;
  @ApiProperty()
  createdTime: Date;
  @ApiProperty()
  reporterId: number;
  @ApiProperty()
  reportedUserId: number;
}
