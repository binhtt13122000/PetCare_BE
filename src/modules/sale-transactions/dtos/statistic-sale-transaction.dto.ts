import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "typeorm";
export class StatisticSaleTransactionDTO extends BaseEntity {
  @ApiProperty()
  transactionFee: number;
  @ApiProperty()
  numberOfSoldPets: number;
  @ApiProperty()
  branchId: number;
  @ApiProperty()
  branch: {
    name: string;
    representativeName: string;
  };
}
