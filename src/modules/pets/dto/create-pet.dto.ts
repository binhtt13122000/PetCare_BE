import { Pet } from "src/entities/pet.entity";

export type CreatePetDto = Pick<
  Pet,
  | "ageRange"
  | "bloodGroup"
  | "categoryId"
  | "color"
  | "description"
  | "dob"
  | "isMale"
  | "isSeed"
  | "name"
> & { ownerId: number };
