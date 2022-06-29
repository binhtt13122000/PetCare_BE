import { ApiProperty } from "@nestjs/swagger";
import { Customer } from "src/entities/user_management_service/customer.entity";
import { Room } from "src/schemas/room.schemas";

export class ResponseRoom extends Room {
  @ApiProperty()
  customer: Customer;
}
