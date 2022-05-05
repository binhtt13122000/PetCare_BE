import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { Account } from "src/entities/authenticate_service/account.entity";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService extends BaseService<Account, UserRepository> {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository);
  }

  findByPhoneNumber(phoneNumber: string): Promise<Account | null> {
    return this.userRepository.findOne({
      where: { phoneNumber: phoneNumber },
      relations: ["role"],
    });
  }
}
