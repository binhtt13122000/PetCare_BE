import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { SaleTransaction } from "src/entities/transaction_service/sale-transaction.entity";
import { SaleTransactionEnum } from "src/enum";
import { Between, IsNull } from "typeorm";
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
  ): Promise<[SaleTransaction[], number]> {
    return this.saleTransactionsRepository.findAndCount({
      where: branchId
        ? {
            branchId: branchId,
            transactionTime: Between(firstDate, lastDate),
            status: SaleTransactionEnum.SUCCESS,
          }
        : {
            transactionTime: Between(firstDate, lastDate),
            status: SaleTransactionEnum.SUCCESS,
          },
    });
  }
}
