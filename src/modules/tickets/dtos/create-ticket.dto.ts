import { ApiProperty } from "@nestjs/swagger";
import { ServiceTicket } from "src/entities/service/service-ticket.entity";
import { TicketStatusEnum, TicketTypeEnum } from "src/enum";

export class CreateTicketDTO {
  @ApiProperty()
  createdTime: Date;
  @ApiProperty()
  meetingDate: Date;
  @ApiProperty()
  startTime: number;
  @ApiProperty()
  endTime: number;
  @ApiProperty()
  branchId: number;
  @ApiProperty()
  customerId: number;
  @ApiProperty()
  serviceTickets: Partial<ServiceTicket>[];
  @ApiProperty()
  status: TicketStatusEnum;
  @ApiProperty()
  type: TicketTypeEnum;
}
