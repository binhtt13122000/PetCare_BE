import { ApiProperty } from "@nestjs/swagger";

export class UpdateMicrochipDTO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  specialMarkings: string;
  @ApiProperty()
  branchName: string;
}
