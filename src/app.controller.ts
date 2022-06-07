import { Controller, Get, Query } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiQuery } from "@nestjs/swagger";

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

  @Get("search-list")
  @ApiQuery({
    name: "value",
    required: false,
  })
  searchList(
    @Query("table") table: string,
    @Query("field") field: string,
    @Query("value") value: string,
    @Query("conditionField") conditionField: string,
  ): Promise<
    Array<{
      key: number;
      value: string;
      conditionField: boolean;
    }>
  > {
    return this.appService.getList(table, field, value || "", conditionField);
  }
}
