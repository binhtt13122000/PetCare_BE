import { Customer } from "src/entities/user_management_service/customer.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Customer)
export class CustomerProfileRepository extends Repository<Customer> {}
