import { ApiProperty } from "@nestjs/swagger";
import { CreateTicketDTO } from "./create-ticket.dto";
export default class UpdateTicketDTO extends CreateTicketDTO {
  @ApiProperty()
  id: number;
}
