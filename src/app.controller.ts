import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  NotFoundException,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiQuery } from "@nestjs/swagger";
import { map } from "rxjs";
import { HttpService } from "@nestjs/axios";
import { PetsService } from "./modules/pets/pets.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private httpService: HttpService,
    private readonly petService: PetsService,
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

  @Post(":id")
  async getSortLink(@Param("id") id: number): Promise<unknown> {
    const pet = await this.petService.findById(id);
    if (!pet) {
      throw new NotFoundException("not found");
    }
    return this.httpService
      .post(
        "https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyAu__3q5Tu7b-cg-29qWpXgaNc00sR1-t4",
        {
          dynamicLinkInfo: {
            domainUriPrefix: "https://tpcs.page.link",
            link: `https://pet-care-admin-fe.vercel.app/guest/${id}?petId=${id}`,
            androidInfo: {
              androidPackageName: "com.example.pet_app_mobile",
            },
          },
        },
      )
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
