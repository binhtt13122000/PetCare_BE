import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";

import { Customer } from "src/entities/user_management_service/customer.entity";
import { CustomerProfileRepository } from "./customer-profile.repository";

@Injectable()
export class CustomerProfileService extends BaseService<
  Customer,
  CustomerProfileRepository
> {
  constructor(
    private readonly customerProfileRepository: CustomerProfileRepository,
  ) {
    super(customerProfileRepository);
  }
}
