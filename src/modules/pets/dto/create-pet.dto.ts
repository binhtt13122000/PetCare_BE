import { Pet } from "src/entities/pet.entity";

export type CreatePetDto = Pick<
  Pet,
  | "ageRange"
  | "bloodGroup"
  | "categoryId"
  | "color"
  | "description"
  | "dob"
  | "gender"
  | "isSeed"
  | "name"
> & { ownerId: number };
