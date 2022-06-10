import { ApiProperty } from "@nestjs/swagger";
import { TicketStatusEnum } from "src/enum";

export default class ChangeStatusTicketDTO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  status: TicketStatusEnum;
  @ApiProperty()
  reasonCancel: string;
}
