import { Account } from "src/entities/authenticate_service/account.entity";
import { Media } from "src/entities/transaction_service/media.entity";
import { Pet } from "src/entities/pet_service/pet.entity";
import { SaleTransaction } from "src/entities/transaction_service/sale-transaction.entity";
import { PostEnum, ServiceEnum } from "src/enum";
import { BreedingTransaction } from "../../../entities/transaction_service/breeding-transaction.entity";

export class CreatePostDTO {
  title: string;
  price: number;
  deposit: number;
  refund: number;
  createTime: Date;
  approveTime: Date;
  effectiveTime: Date;
  type: ServiceEnum;
  description: string;
  status: PostEnum;
  meetingTime: Date;
  healthCheckTime: Date;
  sellerContractImages: Media[];
  reasonCancel: string;
  evidences: Media[];
  healthCheckMedias: Media[];
  petId: number;
  pet: Pet;
  staffId: number;
  staff: Account;
  sellerId: number;
  seller: Account;

  breedingTransactions: BreedingTransaction[];

  saleTransactions: SaleTransaction[];
}
