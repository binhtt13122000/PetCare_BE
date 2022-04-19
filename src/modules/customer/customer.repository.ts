import { EntityRepository, Repository } from "typeorm";
import { Customer } from "src/entities/user_management_service/customer.entity";

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {}
