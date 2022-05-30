import { ApiProperty } from "@nestjs/swagger";

export class CreateBranchDTO {
  @ApiProperty({ required: false })
  email: string;
  @ApiProperty({ required: false })
  name: string;
  @ApiProperty()
  phoneNumber: string;
  @ApiProperty({ required: false })
  address: string;
  @ApiProperty({ required: false })
  lat: number;
  @ApiProperty({ required: false })
  lng: number;
  @ApiProperty()
  representativeName: string;
  @ApiProperty({ required: false })
  description: string;
  @ApiProperty()
  registerTime: Date;
}
