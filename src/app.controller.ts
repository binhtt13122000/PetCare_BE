import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  NotFoundException,
  Inject,
  CACHE_MANAGER,
  Body,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiProperty, ApiQuery } from "@nestjs/swagger";
import { map } from "rxjs";
import { HttpService } from "@nestjs/axios";
import { PetsService } from "./modules/pets/pets.service";
import { Cache } from "cache-manager";
import { v4 } from "uuid";
import { getFirestore } from "firebase-admin/firestore";

class PolicyDTO {
  @ApiProperty()
  name: string;
}

class PostPolicyDTO extends PolicyDTO {
  @ApiProperty()
  value: string;
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private httpService: HttpService,
    private readonly petService: PetsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get("check-exist")
  isExist(
    @Query("table") table: string,
    @Query("field") field: string,
    @Query("value") value: string,
  ): Promise<boolean> {
    return this.appService.isExist(table, field, value);
  }

  @Post("configurations")
  setPolicy(
    @Body() body: PostPolicyDTO,
  ): Promise<FirebaseFirestore.WriteResult> {
    return getFirestore()
      .collection("configurations")
      .doc(body.name)
      .set({
        [body.name]: body.value,
      });
  }

  @Get("configurations/:key")
  getPolicy(
    @Param("key") key: string,
  ): Promise<FirebaseFirestore.DocumentData> {
    return getFirestore().collection("configurations").doc(key).get();
  }

  @Post("/deep-link/:id")
  async getSortLink(@Param("id") id: number): Promise<unknown> {
    const pet = await this.petService.findById(id);
    if (!pet) {
      throw new NotFoundException("not found");
    }

    const uuidKey = v4();
    this.cacheManager.set(uuidKey, id, {
      ttl: 60,
    });
    return this.httpService
      .post(
        "https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyAu__3q5Tu7b-cg-29qWpXgaNc00sR1-t4",
        {
          dynamicLinkInfo: {
            domainUriPrefix: "https://tpcs.page.link",
            link: `https://binhtt.tech/guest/${uuidKey}?petId=${uuidKey}`,
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
  @ApiQuery({
    name: "extraWhereFilter",
    required: false,
  })
  @ApiQuery({
    name: "extraJoinFilter",
    required: false,
  })
  searchList(
    @Query("table") table: string,
    @Query("field") field: string,
    @Query("value") value: string,
    @Query("conditionField") conditionField: string,
    @Query("extraJoinFilter") extraJoinFilter: string,
    @Query("extraWhereFilter") extraWhereFilter: string,
  ): Promise<
    Array<{
      key: number;
      value: string;
      conditionField: boolean;
    }>
  > {
    return this.appService.getList(
      table,
      field,
      value || "",
      conditionField,
      extraJoinFilter || "",
      extraWhereFilter || "",
    );
  }
}
