import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Put,
} from "@nestjs/common";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { IdParams } from "src/common";
import { Customer } from "src/entities/user_management_service/customer.entity";
import { CustomerProfileService } from "./customer-profile.service";
import { UpdateCustomerProfileDTO } from "./dto/update-customer-profile.dto";

@Controller("customer-profile")
@ApiTags("customer-profile")
export class CustomerProfileController {
  constructor(
    private readonly customerProfileService: CustomerProfileService,
  ) {}

  @Get(":id")
  async getAll(@Param() params: IdParams): Promise<Customer> {
    try {
      return this.customerProfileService.findById(params.id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiConsumes("multipart/form-data")
  @Put()
  async update(@Body() body: UpdateCustomerProfileDTO): Promise<Customer> {
    try {
      const customerProfile: Partial<Customer> = {
        ...body,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phoneNumber: body.phoneNumber,
        address: body.address,
        gender: body.gender,
        star: body.star,
        point: body.point,
        numberFollowers: body.numberFollowers,
        numberReviewers: body.numberReviewers,
        bankName: body.bankName,
        bankCode: body.bankCode,
        bankBranch: body.bankBranch,
      };
      return await this.customerProfileService.update(
        customerProfile.id,
        customerProfile,
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
