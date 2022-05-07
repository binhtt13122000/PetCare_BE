import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Staff } from "src/entities/user_management_service/staff.entity";
import { CreateStaffDTO } from "./dtos/create-staff.dto";
import { StaffService } from "./staff.service";

@ApiTags("staffs")
@Controller("staffs")
export class StaffsController {
  constructor(private readonly staffService: StaffService) {}

  @Post()
  async createStaff(@Body() body: CreateStaffDTO): Promise<Staff> {
    return null;
  }
}
