import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { PageMetaDto } from "src/common/page-meta.dto";
import { PageDto } from "src/common/page.dto";
import { Service } from "src/entities/service/service.entity";

import { ServiceOptionDto } from "./dto/service-option.dto";
import { ServiceRepository } from "./services.repository";

@Injectable()
export class ShopService extends BaseService<Service, ServiceRepository> {
  constructor(private readonly serviceRepository: ServiceRepository) {
    super(serviceRepository);
  }

  public async getServices(
    pageOptionsDto: ServiceOptionDto,
  ): Promise<PageDto<Service>> {
    const queryBuilder = await this.serviceRepository.createQueryBuilder(
      "service",
    );

    const checkName = pageOptionsDto.name;
    const checkStatus = pageOptionsDto.status;
    const checkDescription = pageOptionsDto.description;
    const checkPriceTo = pageOptionsDto.priceTo;
    const checkPriceFrom = pageOptionsDto.priceFrom;

    if (checkName) {
      if (
        checkName &&
        checkDescription &&
        checkStatus &&
        checkPriceFrom &&
        checkPriceTo
      ) {
        await queryBuilder
          .where("service.name ilike :name", {
            name: "%" + pageOptionsDto.name + "%",
          })
          .andWhere("service.description ilike :description", {
            description: "%" + pageOptionsDto.description + "%",
          })
          .where("service.price >= :priceTo AND service.price <= :priceFrom", {
            priceTo: pageOptionsDto.priceTo,
            priceFrom: pageOptionsDto.priceFrom,
          })
          .andWhere("service.status = :status", {
            status: pageOptionsDto.status,
          });
        const { entities } = await queryBuilder.getRawAndEntities();
        const itemCount = await queryBuilder.getCount();
        const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
        return new PageDto(entities, pageMetaDto);
      } else {
        await queryBuilder.where("service.name ilike :name", {
          name: "%" + pageOptionsDto.name + "%",
        });

        const { entities } = await queryBuilder.getRawAndEntities();
        const itemCount = await queryBuilder.getCount();
        const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
        return new PageDto(entities, pageMetaDto);
      }
    }

    await queryBuilder
      .where("service.name ilike :name", {
        name: "%" + pageOptionsDto.name + "%",
      })
      .andWhere("service.description ilike :description", {
        description: "%" + pageOptionsDto.description + "%",
      })
      .where("service.price >= :priceTo AND service.price <= :priceFrom", {
        priceTo: pageOptionsDto.priceTo,
        priceFrom: pageOptionsDto.priceFrom,
      })
      .andWhere("service.status = :status", {
        status: pageOptionsDto.status,
      });

    const { entities } = await queryBuilder.getRawAndEntities();
    const itemCount = await queryBuilder.getCount();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(entities, pageMetaDto);
  }
}

// if (
//   pageOptionsDto.name &&
//   pageOptionsDto.description &&
//   pageOptionsDto.status &&
//   pageOptionsDto.priceFrom
// ) {
//   await queryBuilder
//     .where("service.name ilike :name", {
//       name: "%" + pageOptionsDto.name + "%",
//     })
//     .andWhere("service.description ilike :description", {
//       description: "%" + pageOptionsDto.description + "%",
//     })
//     .where("service.price >= :priceTo AND service.price <= :priceFrom", {
//       priceTo: pageOptionsDto.priceTo,
//       priceFrom: pageOptionsDto.priceFrom,
//     })
//     .andWhere("service.status = :status", {
//       status: pageOptionsDto.status,
//     });

//   const { entities } = await queryBuilder.getRawAndEntities();
//   const itemCount = await queryBuilder.getCount();
//   const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
//   return new PageDto(entities, pageMetaDto);
// } else {
//   queryBuilder

//     .orderBy(
//       "service." + pageOptionsDto.serviceOrderName,
//       pageOptionsDto.orderType,
//     )
//     // .addOrderBy("service." + pageOptionsDto.id, pageOptionsDto.orderType)
//     .skip(pageOptionsDto.skip)
//     .take(pageOptionsDto.limit);

//   const itemCount = await queryBuilder.getCount();
//   const { entities } = await queryBuilder.getRawAndEntities();
//   const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
//   return new PageDto(entities, pageMetaDto);
// }
