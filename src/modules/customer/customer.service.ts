import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { Account } from "src/entities/authenticate_service/account.entity";
import { Customer } from "src/entities/user_management_service/customer.entity";
import { CustomerRepository } from "./customer.repository";

@Injectable()
export class CustomerService extends BaseService<Customer, CustomerRepository> {
  constructor(private readonly customerRepository: CustomerRepository) {
    super(customerRepository);
  }

  findByAccountId(accountId: number): Promise<Customer | null> {
    return this.customerRepository.findOne({
      where: { accountId },
    });
  }
}
