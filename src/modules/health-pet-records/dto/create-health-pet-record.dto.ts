import { ApiProperty } from "@nestjs/swagger";
import { HealthPetRecordEnum } from "src/enum";

export class CreateHealthPetRecordDTO {
  @ApiProperty()
  dateOfInjection: Date;

  @ApiProperty({ required: false })
  description: string;

  @ApiProperty()
  type: HealthPetRecordEnum;

  @ApiProperty({
    nullable: true,
  })
  vaccineType: string;

  @ApiProperty({
    nullable: true,
  })
  vaccineId?: number;

  @ApiProperty()
  petId: number;

  @ApiProperty()
  branchId: number;
}
