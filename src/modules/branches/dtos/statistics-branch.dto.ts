import { ApiProperty } from "@nestjs/swagger";

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
}

export class StatisticBranchQuery {
  @ApiProperty({ required: false, default: null })
  startDate?: Date;
  @ApiProperty({ required: false, default: null })
  endDate?: Date;
  @ApiProperty({ required: false, default: null })
  branchId?: number;
}
