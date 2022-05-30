import { Controller, Get, Query } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("check-exist")
  isExist(
    @Query("table") table: string,
    @Query("field") field: string,
    @Query("value") value: string,
  ): Promise<boolean> {
    return this.appService.isExist(table, field, value);
  }
}
