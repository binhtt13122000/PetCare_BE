import { Vaccine } from "src/entities/vaccine.entity";
export type CreateVaccine = Pick<
  Vaccine,
  "dateOfInjection" | "description" | "petId" | "name"
>;
