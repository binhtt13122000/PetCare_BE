import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { Service } from "src/entities/service/service.entity";

import { PageMetaDto } from "./dto/page-meta.dto";
import { PageOptionsDto } from "./dto/page-options.dto";
import { PageDto } from "./dto/page.dto";
import { ServiceRepository } from "./services.repository";

@Injectable()
export class ShopService extends BaseService<Service, ServiceRepository> {
  constructor(private readonly serviceRepository: ServiceRepository) {
    super(serviceRepository);
  }

  public async getUsers(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Service>> {
    const queryBuilder = await this.serviceRepository.createQueryBuilder(
      "service",
    );

    if (pageOptionsDto.name) {
      await queryBuilder
        .where("service.name ilike :name", {
          name: "%" + pageOptionsDto.name + "%",
        })
        .andWhere("service.description ilike :description", {
          description: "%" + pageOptionsDto.description + "%",
        })
        .andWhere("service.status = :status", {
          status: pageOptionsDto.status,
        });

      const { entities } = await queryBuilder.getRawAndEntities();
      const itemCount = await queryBuilder.getCount();
      const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
      return new PageDto(entities, pageMetaDto);
    } else {
      queryBuilder

        .orderBy(
          "service." + pageOptionsDto.serviceOrderName,
          pageOptionsDto.orderType,
        )
        // .addOrderBy("service." + pageOptionsDto.id, pageOptionsDto.orderType)
        .skip(pageOptionsDto.skip)
        .take(pageOptionsDto.limit);

      const itemCount = await queryBuilder.getCount();
      const { entities } = await queryBuilder.getRawAndEntities();
      const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
      return new PageDto(entities, pageMetaDto);
    }
  }
}
