import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";
import { TicketStatusEnum } from "./enum";
import { TicketsService } from "./modules/tickets/tickets.service";

@Injectable()
export class AppService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
    private readonly ticketService: TicketsService,
  ) {}

  private readonly logger = new Logger(AppService.name);

  @Cron("45 * * * * *")
  handleCron(): void {
    // eslint-disable-next-line no-console
    console.log(new Date());
    this.logger.debug("Called when the current second is 45");
  }

  @Cron("0 32 2 * * *", {
    name: "checkExpiredTicket",
    timeZone: "Asia/Ho_Chi_Minh",
  })
  async handleCronCheckExpiredTicket(): Promise<void> {
    const yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
    const ticketList =
      await this.ticketService.getTicketAvailableInSpecificDate(
        yesterday.toDateString(),
      );
    // eslint-disable-next-line no-console
    console.log("Check run cron job" + yesterday.toDateString());
    // eslint-disable-next-line no-console
    console.log(ticketList);
    if (ticketList && ticketList.length > 0) {
      ticketList.forEach(async (item) => {
        item.status = TicketStatusEnum.EXPIRED;
        await item.save();
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
