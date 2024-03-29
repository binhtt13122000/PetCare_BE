import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { Customer } from "src/entities/user_management_service/customer.entity";
import { CustomerRepository } from "./customer.repository";

@Injectable()
export class CustomerService extends BaseService<Customer, CustomerRepository> {
  constructor(private readonly customerRepository: CustomerRepository) {
    super(customerRepository);
  }

  findByPhoneNumber(phoneNumber: string): Promise<Customer | null> {
    return this.customerRepository.findOne({
      where: { phoneNumber },
    });
  }

  findOne(id: number): Promise<Customer> {
    return this.customerRepository.findOne({
      where: {
        id: id,
      },
      relations: ["posts"],
    });
  }
}
