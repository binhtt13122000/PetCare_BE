import { Controller, Get, Query } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiQuery } from "@nestjs/swagger";
import { map } from "rxjs";
import { HttpService } from "@nestjs/axios";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private httpService: HttpService,
  ) {}

  @Get("check-exist")
  isExist(
    @Query("table") table: string,
    @Query("field") field: string,
    @Query("value") value: string,
  ): Promise<boolean> {
    return this.appService.isExist(table, field, value);
  }

  @Get()
  findAll(): unknown {
    return this.httpService
      .get("http://139.59.227.101:3000/api/getAllAssets")
      .pipe(map((response) => response.data));
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
