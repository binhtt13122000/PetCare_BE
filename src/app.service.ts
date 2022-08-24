import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";
import {
  formatDateCustomDateMonthYear,
  getSpecificDateAgoWithNumberDays,
  getSpecificDateFutureWithNumberDays,
} from "./common/utils";
import {
  BreedingTransactionEnum,
  NotificationEnum,
  OrderEnum,
  SaleTransactionEnum,
  TicketStatusEnum,
} from "./enum";
import { BreedTransactionService } from "./modules/breed-transaction/breed-transaction.service";
import { OrdersService } from "./modules/orders/orders.service";
import { PetComboServicesService } from "./modules/pet-combo-services/pet-combo-services.service";
import { SaleTransactionsService } from "./modules/sale-transactions/sale-transactions.service";
import { TicketsService } from "./modules/tickets/tickets.service";
import { UserService } from "./modules/users/user.service";
import { NotificationProducerService } from "./shared/notification/notification.producer.service";
import { getFirestore } from "firebase-admin/firestore";

@Injectable()
export class AppService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
    private readonly ticketService: TicketsService,
    private readonly saleTransactionService: SaleTransactionsService,
    private readonly breedingTransactionService: BreedTransactionService,
    private readonly petComboServicesService: PetComboServicesService,
    private readonly orderService: OrdersService,
    private readonly userService: UserService,
    private notificationProducerService: NotificationProducerService,
  ) {}

  private readonly logger = new Logger(AppService.name);

  //Run Schedule after 00:05:00am each day  to check expired ticket yesterday.
  @Cron("0 5 0 * * *", {
    name: "checkExpiredTicketsYesterday",
    timeZone: "Asia/Ho_Chi_Minh",
  })
  async handleCronCheckExpiredTicket(): Promise<void> {
    let DAYS = 1;
    try {
      const payload = (
        await getFirestore()
          .collection("configurations")
          .doc("expiredTicketTime")
          .get()
      ).data();
      if (!isNaN(+payload["expiredTicketTime"])) {
        DAYS = +payload["expiredTicketTime"];
      }
    } catch (error) {
      DAYS = 1;
    }
    const yesterday = getSpecificDateAgoWithNumberDays(DAYS);
    const ticketList =
      await this.ticketService.getTicketAvailableInSpecificDate(
        yesterday.toDateString(),
      );
    if (ticketList && ticketList.length > 0) {
      ticketList.forEach(async (item) => {
        item.status = TicketStatusEnum.EXPIRED;
        await item.save();
      });
    }
  }

  //Run schedule after 00:10:00am each day to check expired sale transaction 3 days ago.
  @Cron("0 10 0 * * *", {
    name: "checkExpiredSaleTransactionsThreeDaysAgo",
    timeZone: "Asia/Ho_Chi_Minh",
  })
  async handleCronCheckExpiredSaleTransactions(): Promise<void> {
    let DAYS = 3;
    try {
      const payload = (
        await getFirestore()
          .collection("configurations")
          .doc("expiredSaleTransaction")
          .get()
      ).data();
      if (!isNaN(+payload["expiredSaleTransaction"])) {
        DAYS = +payload["expiredSaleTransaction"];
      }
    } catch (error) {
      DAYS = 3;
    }
    const dateWithThreeDaysAgo = getSpecificDateAgoWithNumberDays(DAYS);
    const saleTransactionList =
      await this.saleTransactionService.getSaleTransactionAvailableInSpecificDate(
        dateWithThreeDaysAgo.toDateString(),
      );
    if (saleTransactionList && saleTransactionList.length > 0) {
      saleTransactionList.forEach(async (item) => {
        item.status = SaleTransactionEnum.EXPIRED;
        await item.save();
      });
    }
  }

  //Run schedule after 00:15:00am each day to check expired breeding transactions at status created 3 days ago.
  @Cron("0 15 0 * * *", {
    name: "checkExpiredBreedingTransactionsAtStatusCreatedThreeDaysAgo",
    timeZone: "Asia/Ho_Chi_Minh",
  })
  async handleCronCheckExpiredBreedingTransactionsAtStatusCreated(): Promise<void> {
    let DAYS = 3;
    try {
      const payload = (
        await getFirestore()
          .collection("configurations")
          .doc("expiredBreedTransactionAtCreated")
          .get()
      ).data();
      if (!isNaN(+payload["expiredBreedTransactionAtCreated"])) {
        DAYS = +payload["expiredBreedTransactionAtCreated"];
      }
    } catch (error) {
      DAYS = 3;
    }
    const dateWithThreeDaysAgo = getSpecificDateAgoWithNumberDays(DAYS);
    const breedingTransactionList =
      await this.breedingTransactionService.getBreedingTransactionsAvailableInSpecificDate(
        dateWithThreeDaysAgo.toDateString(),
        BreedingTransactionEnum.CREATED,
      );
    if (breedingTransactionList && breedingTransactionList.length > 0) {
      breedingTransactionList.forEach(async (item) => {
        item.status = BreedingTransactionEnum.EXPIRED;
        await item.save();
      });
    }
  }

  //Run schedule after 00:20:00am each day to check expired breeding transactions at status breeding requested 3 days ago.
  @Cron("0 20 0 * * *", {
    name: "checkExpiredBreedingTransactionsAtStatusBreedingRequestedThreeDaysAgo",
    timeZone: "Asia/Ho_Chi_Minh",
  })
  async handleCronCheckExpiredBreedingTransactionsAtStatusBreedingRequested(): Promise<void> {
    let DAYS = 3;
    try {
      const payload = (
        await getFirestore()
          .collection("configurations")
          .doc("expiredBreedTransactionAtRequested")
          .get()
      ).data();
      if (!isNaN(+payload["expiredBreedTransactionAtRequested"])) {
        DAYS = +payload["expiredBreedTransactionAtRequested"];
      }
    } catch (error) {
      DAYS = 3;
    }
    const dateWithThreeDaysAgo = getSpecificDateAgoWithNumberDays(DAYS);
    const breedingTransactionList =
      await this.breedingTransactionService.getBreedingTransactionsAvailableInSpecificDate(
        dateWithThreeDaysAgo.toDateString(),
        BreedingTransactionEnum.BREEDING_REQUESTED,
      );
    if (breedingTransactionList && breedingTransactionList.length > 0) {
      breedingTransactionList.forEach(async (item) => {
        item.status = BreedingTransactionEnum.BREEDING_EXPIRED;
        await item.save();
      });
    }
  }

  //Run schedule after 00:25:00am each day to check expired order at status waiting 3 days ago.
  @Cron("0 25 0 * * *", {
    name: "checkExpiredOrderAtStatusWaitingThreeDaysAgo",
    timeZone: "Asia/Ho_Chi_Minh",
  })
  async handleCronCheckExpiredOrderAtStatusWaiting(): Promise<void> {
    const DAYS = 3;
    const dateWithThreeDaysAgo = getSpecificDateAgoWithNumberDays(DAYS);
    const orderList = await this.orderService.getOrdersAvailableInSpecificDate(
      dateWithThreeDaysAgo.toDateString(),
      OrderEnum.WAITING,
    );
    if (orderList && orderList.length > 0) {
      orderList.forEach(async (item) => {
        item.status = OrderEnum.EXPIRED;
        await item.save();
      });
    }
  }

  //Run schedule after 06:30:00am each day to check coming available services in combo before 3 days.
  @Cron("0 30 6 * * *", {
    name: "notificationServiceInComboInThreeDays",
    timeZone: "Asia/Ho_Chi_Minh",
  })
  async handleCronNotificationServiceInComboInThreeDays(): Promise<void> {
    const DAYS = 3;
    const dateWithThreeDaysFuture = getSpecificDateFutureWithNumberDays(DAYS);
    const currentDate = getSpecificDateAgoWithNumberDays(0);
    const petComboServicesList =
      await this.petComboServicesService.getServiceInComboAvailableInSpecificRangeDate(
        currentDate.toDateString(),
        dateWithThreeDaysFuture.toDateString(),
      );
    if (petComboServicesList && petComboServicesList.length > 0) {
      petComboServicesList.forEach(async (item) => {
        if (item.phoneNumber) {
          const accountCustomerInstance =
            await this.userService.findByPhoneNumber(item.phoneNumber.trim());
          if (accountCustomerInstance) {
            petComboServicesList.forEach(async (item) => {
              await this.notificationProducerService.sendMessage(
                {
                  body: `Service Name: ${item.name} - Date: ${
                    formatDateCustomDateMonthYear(item.workingTime) ||
                    formatDateCustomDateMonthYear(new Date())
                  }`,
                  title: `Service: ${item.name} is coming.`,
                  type: NotificationEnum.AVAILABLE_SERVICE_IN_COMBO,
                  metadata: String(item.petComboId),
                },
                accountCustomerInstance.id,
              );
            });
          }
        }
      });
    }
  }

  async isExist(table: string, field: string, value: string): Promise<boolean> {
    const x = await this.entityManager.query(
      `select * from ${table} where ${table}."${field}" = '${value}'`,
    );
    return x && x.length > 0;
  }

  async getList(
    table: string,
    field: string,
    value: string,
    conditionField: string,
    extraJoinFilter: string,
    extraWhereFilter: string,
  ): Promise<
    Array<{
      key: number;
      value: string;
      conditionField: boolean;
    }>
  > {
    const x = await this.entityManager.query(
      `select ${table}.* from ${table} ${
        extraJoinFilter || ""
      } where ${table}."${field}" LIKE '%${value}%' ${extraWhereFilter || ""}`,
    );
    return x.map((data: Record<string, object>) => {
      return {
        key: data.id,
        value: data[field],
        conditionField: data[conditionField],
      };
    });
  }
}
