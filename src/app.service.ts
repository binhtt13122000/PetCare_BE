import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";
import {
  formatDateCustomDateMonthYear,
  getSpecificDateAgoWithNumberDays,
} from "./common/utils";
import {
  NotificationEnum,
  SaleTransactionEnum,
  TicketStatusEnum,
} from "./enum";
import { PetComboServicesService } from "./modules/pet-combo-services/pet-combo-services.service";
import { SaleTransactionsService } from "./modules/sale-transactions/sale-transactions.service";
import { TicketsService } from "./modules/tickets/tickets.service";
import { UserService } from "./modules/users/user.service";
import { NotificationProducerService } from "./shared/notification/notification.producer.service";

@Injectable()
export class AppService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
    private readonly ticketService: TicketsService,
    private readonly saleTransactionService: SaleTransactionsService,
    private readonly petComboServicesService: PetComboServicesService,
    private readonly userService: UserService,
    private notificationProducerService: NotificationProducerService,
  ) {}

  private readonly logger = new Logger(AppService.name);

  @Cron("45 * * * * *")
  handleCron(): void {
    // eslint-disable-next-line no-console
    console.log(new Date());
    this.logger.debug("Called when the current second is 45");
  }

  //Run Schedule after 00:05:00am each day  to check expired ticket yesterday.
  @Cron("0 50 14 * * *", {
    name: "checkExpiredTicketsYesterday",
    timeZone: "Asia/Ho_Chi_Minh",
  })
  async handleCronCheckExpiredTicket(): Promise<void> {
    const DAYS = 1;
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
  @Cron("0 50 14 * * *", {
    name: "checkExpiredSaleTransactionsThreeDaysAgo",
    timeZone: "Asia/Ho_Chi_Minh",
  })
  async handleCronCheckExpiredSaleTransaction(): Promise<void> {
    const DAYS = 3;
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

  //Run schedule after 06:30:00am each day to check expired sale transaction 3 days ago.
  @Cron("0 50 14 * * *", {
    name: "notificationServiceInComboInThreeDays",
    timeZone: "Asia/Ho_Chi_Minh",
  })
  async handleCronNotificationServiceInComboInThreeDays(): Promise<void> {
    const DAYS = 3;
    const dateWithThreeDaysAgo = getSpecificDateAgoWithNumberDays(DAYS);
    const currentDate = getSpecificDateAgoWithNumberDays(0);
    const petComboServicesList =
      await this.petComboServicesService.getServiceInComboAvailableInSpecificRangeDate(
        currentDate.toDateString(),
        dateWithThreeDaysAgo.toDateString(),
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
  ): Promise<
    Array<{
      key: number;
      value: string;
      conditionField: boolean;
    }>
  > {
    const x = await this.entityManager.query(
      `select * from ${table} where ${table}."${field}" LIKE '%${value}%'`,
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
