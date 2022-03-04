import { Paper } from "src/entities/paper.entity";

export type CreatePaper = Pick<
  Paper,
  "date" | "name" | "type" | "status" | "description" | "petId"
>;
