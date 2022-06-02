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
