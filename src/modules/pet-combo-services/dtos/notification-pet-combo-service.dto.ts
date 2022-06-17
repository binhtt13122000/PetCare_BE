import { ApiProperty } from "@nestjs/swagger";

export class NotificationPetComboServiceDTO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  petComboId: number;
  @ApiProperty()
  workingTime: Date;
  @ApiProperty()
  isCompleted: boolean;
  @ApiProperty()
  petId: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  customerId: number;
  @ApiProperty()
  phoneNumber: string;
}
