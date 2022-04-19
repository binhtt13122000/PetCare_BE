import { CreatePaperDTO } from "./create-paper.dto";
import { ApiProperty } from "@nestjs/swagger";
export class UpdatePaperDTO extends CreatePaperDTO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  evidence: string;
}
