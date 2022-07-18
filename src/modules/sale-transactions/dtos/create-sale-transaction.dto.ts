import { ApiProperty } from "@nestjs/swagger";
import { SaleTransactionEnum } from "src/enum";

export class CreateSaleTransactionDTO {
  @ApiProperty()
  createdTime: Date;
  @ApiProperty()
  meetingTime: Date;
  @ApiProperty()
  placeMeeting: string;
  @ApiProperty({ type: "enum", enum: SaleTransactionEnum })
  status: SaleTransactionEnum;
  @ApiProperty()
  buyerId: number;
  @ApiProperty()
  sellerId: number;
  @ApiProperty()
  petId: number;
  @ApiProperty()
  postId: number;
  @ApiProperty()
  point: number;
  @ApiProperty()
  branchId: number;
}
