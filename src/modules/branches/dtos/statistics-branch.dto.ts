import { ApiProperty } from "@nestjs/swagger";
import { StatisticBreedTransactionDTO } from "src/modules/breed-transaction/dtos/statistic-breed-transaction.dto";
import { StatisticOrderDTO } from "src/modules/orders/dto/statistic-order.dto";
import { StatisticSaleTransactionDTO } from "src/modules/sale-transactions/dtos/statistic-sale-transaction.dto";

export class ServiceRankDTO {
  serviceId: number;
  count: number;
  name: string;
}

export class StatisticBranchDTO {
  numberOrdersInMonth: number;
  revenueOfTheMonth: number;
  numberOfSoldPets: number;
  revenueOfSoldPetsInMonth: number;
  numberOfBreedingPets: number;
  revenueOfBreedingPetsInMonth: number;
  rankServices: ServiceRankDTO[];
  orders: StatisticOrderDTO[];
  saleTransactions: StatisticSaleTransactionDTO[];
  breedingTransactions: StatisticBreedTransactionDTO[];
}

export class StatisticBranchQuery {
  @ApiProperty({ required: false, default: null })
  startDate?: Date;
  @ApiProperty({ required: false, default: null })
  endDate?: Date;
  @ApiProperty({ required: false, default: null })
  branchId?: number;
}
