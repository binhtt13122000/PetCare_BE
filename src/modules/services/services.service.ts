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
    const checkHealthCheck = pageOptionsDto.isHealthCheck;
    const nameSql = "service.name ilike :name";
    const descriptionSql = "service.description ilike :description";
    const statusSql = "service.status = :status";
    const healthCheckSql = "service.isHealthCheck = :isHealthCheck";
    const priceSql =
      "service.price >= :priceFrom AND service.price <= :priceTo";

    if (checkName) {
      if (
        checkName &&
        checkDescription &&
        checkStatus &&
        checkPriceFrom &&
        checkPriceTo &&
        checkHealthCheck
      ) {
        await queryBuilder
          .where(nameSql, {
            name: "%" + pageOptionsDto.name + "%",
          })
          .andWhere(descriptionSql, {
            description: "%" + pageOptionsDto.description + "%",
          })
          .andWhere(priceSql, {
            priceTo: pageOptionsDto.priceTo,
            priceFrom: pageOptionsDto.priceFrom,
          })
          .andWhere(statusSql, {
            status: pageOptionsDto.status,
          })
          .andWhere(healthCheckSql, {
            isHealthCheck: pageOptionsDto.isHealthCheck,
          });
      } else if (
        checkName &&
        checkDescription &&
        checkStatus &&
        checkHealthCheck
      ) {
        await queryBuilder
          .where(nameSql, {
            name: "%" + pageOptionsDto.name + "%",
          })
          .andWhere(descriptionSql, {
            description: "%" + pageOptionsDto.description + "%",
          })
          .andWhere(statusSql, {
            status: pageOptionsDto.status,
          })
          .andWhere(healthCheckSql, {
            isHealthCheck: pageOptionsDto.isHealthCheck,
          });
      }
      // Start check Name
      else if (checkName && checkDescription) {
        await queryBuilder
          .where(nameSql, {
            name: "%" + pageOptionsDto.name + "%",
          })
          .andWhere(descriptionSql, {
            description: "%" + pageOptionsDto.description + "%",
          });
      } else if (checkName && checkStatus) {
        await queryBuilder
          .where(nameSql, {
            name: "%" + pageOptionsDto.name + "%",
          })
          .andWhere(statusSql, {
            status: pageOptionsDto.status,
          });
      } else if (checkName && checkHealthCheck) {
        await queryBuilder
          .where(nameSql, {
            name: "%" + pageOptionsDto.name + "%",
          })
          .andWhere(healthCheckSql, {
            isHealthCheck: pageOptionsDto.isHealthCheck,
          });
      } else if (checkName && checkHealthCheck && checkStatus) {
        await queryBuilder
          .where(nameSql, {
            name: "%" + pageOptionsDto.name + "%",
          })
          .andWhere(healthCheckSql, {
            isHealthCheck: pageOptionsDto.isHealthCheck,
          })
          .andWhere(statusSql, {
            status: pageOptionsDto.status,
          });
      } else if (checkName && checkPriceFrom && checkPriceTo) {
        await queryBuilder
          .where(nameSql, {
            name: "%" + pageOptionsDto.name + "%",
          })
          .andWhere(healthCheckSql, {
            isHealthCheck: pageOptionsDto.isHealthCheck,
          })
          .andWhere(priceSql, {
            priceTo: pageOptionsDto.priceTo,
            priceFrom: pageOptionsDto.priceFrom,
          });
      }
      // Finish check Name

      // Start check Status,HealthCheck
      else if (checkStatus && checkPriceTo && checkPriceFrom) {
        await queryBuilder
          .where(statusSql, {
            status: pageOptionsDto.status,
          })
          .andWhere(priceSql, {
            priceTo: pageOptionsDto.priceTo,
            priceFrom: pageOptionsDto.priceFrom,
          });
      } else if (checkHealthCheck && checkPriceTo && checkPriceFrom) {
        await queryBuilder
          .where(healthCheckSql, {
            isHealthCheck: pageOptionsDto.isHealthCheck,
          })
          .andWhere(priceSql, {
            priceTo: pageOptionsDto.priceTo,
            priceFrom: pageOptionsDto.priceFrom,
          });
      }
      // Finish check Status, HealthCheck
      else if (checkName) {
        await queryBuilder.where(nameSql, {
          name: "%" + pageOptionsDto.name + "%",
        });
      } else if (checkStatus) {
        await queryBuilder.where(statusSql, {
          status: pageOptionsDto.status,
        });
      } else if (checkHealthCheck) {
        await queryBuilder.where(healthCheckSql, {
          isHealthCheck: pageOptionsDto.isHealthCheck,
        });
      }
      // Start check Description
      else if (checkDescription) {
        await queryBuilder.where(descriptionSql, {
          description: "%" + pageOptionsDto.description + "%",
        });
      } else if (checkDescription && checkStatus) {
        await queryBuilder
          .where(descriptionSql, {
            description: "%" + pageOptionsDto.description + "%",
          })
          .andWhere(statusSql, {
            status: pageOptionsDto.status,
          });
      } else if (checkDescription && checkHealthCheck) {
        await queryBuilder
          .where(descriptionSql, {
            description: "%" + pageOptionsDto.description + "%",
          })
          .andWhere(healthCheckSql, {
            isHealthCheck: pageOptionsDto.isHealthCheck,
          });
      } else if (checkDescription && checkPriceTo && checkPriceFrom) {
        await queryBuilder
          .where(descriptionSql, {
            description: "%" + pageOptionsDto.description + "%",
          })
          .andWhere(priceSql, {
            priceTo: pageOptionsDto.priceTo,
            priceFrom: pageOptionsDto.priceFrom,
          });
      }

      // Finish check description
    }

    const { entities } = await queryBuilder.getRawAndEntities();
    const itemCount = await queryBuilder.getCount();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(entities, pageMetaDto);
  }
}
