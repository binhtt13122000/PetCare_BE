import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "typeorm";
export class StatisticBreedTransactionDTO extends BaseEntity {
  @ApiProperty()
  serviceFee: number;
  @ApiProperty()
  transactionFee: number;
  @ApiProperty()
  numberOfBreedingPets: number;
  @ApiProperty()
  branchId: number;
  @ApiProperty()
  branch: {
    name: string;
    representativeName: string;
  };
}
