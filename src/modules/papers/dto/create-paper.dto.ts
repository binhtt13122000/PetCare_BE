import { ApiProperty } from "@nestjs/swagger";
import { PaperEnum } from "src/enum";
export class CreatePaperDTO {
  @ApiProperty()
  name: string;
  @ApiProperty({ enum: PaperEnum })
  type: PaperEnum;
  @ApiProperty()
  description: string;
  @ApiProperty()
  petId: number;
  @ApiProperty()
  date: Date;
  @ApiProperty({ type: "string", format: "binary" })
  file: Express.Multer.File;
}
