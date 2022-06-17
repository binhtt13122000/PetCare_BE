import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { SaleTransaction } from "src/entities/transaction_service/sale-transaction.entity";
import { SaleTransactionEnum } from "src/enum";
import { StatisticSaleTransactionDTO } from "./dtos/statistic-sale-transaction.dto";
import { SaleTransactionsRepository } from "./sale-transaction.repository";

@Injectable()
export class SaleTransactionsService extends BaseService<
  SaleTransaction,
  SaleTransactionsRepository
> {
  constructor(
    private readonly saleTransactionsRepository: SaleTransactionsRepository,
  ) {
    super(saleTransactionsRepository);
  }

  getSaleTransactionsByBuyerId(
    buyerId: number,
    limit: number,
    page: number,
  ): Promise<SaleTransaction[]> {
    return this.saleTransactionsRepository.find({
      where: {
        buyerId: buyerId,
      },
      take: limit,
      skip: (page - 1) * limit,
      relations: ["buyer", "seller"],
      order: {
        createdTime: "DESC",
      },
    });
  }

  getSaleTransactionsBySellerId(
    sellerId: number,
    limit: number,
    page: number,
  ): Promise<SaleTransaction[]> {
    return this.saleTransactionsRepository.find({
      where: {
        sellerId: sellerId,
      },
      take: limit,
      skip: (page - 1) * limit,
      relations: ["buyer", "seller"],
      order: {
        createdTime: "DESC",
      },
    });
  }

  getOne(id: number): Promise<SaleTransaction> {
    return this.saleTransactionsRepository.findOne({
      where: {
        id: id,
      },
      relations: [
        "seller",
        "buyer",
        "pet",
        "post",
        "branch",
        "post.medias",
        "pet.breed",
        "pet.breed.species",
      ],
    });
  }

  getSaleTransactionBranchInMonth(
    branchId: number,
    firstDate: Date,
    lastDate: Date,
  ): Promise<StatisticSaleTransactionDTO[]> {
    return this.saleTransactionsRepository
      .createQueryBuilder("sale-transactions")
      .where(
        branchId
          ? "sale-transactions.branchId = :branchId and sale-transactions.status = :status and sale-transactions.transactionTime >= :firstDate and sale-transactions.transactionTime <= :lastDate"
          : "sale-transactions.status = :status and sale-transactions.transactionTime >= :firstDate and sale-transactions.transactionTime <= :lastDate",
        branchId
          ? {
              branchId: branchId,
              status: SaleTransactionEnum.SUCCESS,
              firstDate: firstDate,
              lastDate: lastDate,
            }
          : {
              status: SaleTransactionEnum.SUCCESS,
              firstDate: firstDate,
              lastDate: lastDate,
            },
      )
      .leftJoinAndSelect("sale-transactions.branch", "branch")
      .groupBy("sale-transactions.branchId")
      .addGroupBy("branch.name")
      .addGroupBy("branch.representativeName")
      .select(
        'SUM(sale-transactions.transactionFee) as "transactionFee", COUNT(sale-transactions.id) as "numberOfSoldPets", sale-transactions.branchId, branch.name, branch.representativeName',
      )
      .execute();
  }

  getSaleTransactionAvailableInSpecificDate(
    date: string,
  ): Promise<SaleTransaction[]> {
    return this.saleTransactionsRepository.find({
      where: {
        meetingTime: date,
        status: SaleTransactionEnum.CREATED,
      },
    });
  }
}
