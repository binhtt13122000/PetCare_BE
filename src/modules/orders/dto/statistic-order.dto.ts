import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "typeorm";
export class StatisticOrderDTO extends BaseEntity {
  @ApiProperty()
  orderTotal: number;
  @ApiProperty()
  branchId: number;
  @ApiProperty()
  numberOrdersInMonth: number;
  @ApiProperty()
  branch: {
    name: string;
    representativeName: string;
  };
}
