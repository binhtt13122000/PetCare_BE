import { filter } from "rxjs";
import { PageMetaDto } from "src/common/page-meta.dto";
import { PageOptionsDto } from "src/common/page-options.dto";
import { PageDto } from "src/common/page.dto";
import { BaseEntity, DeepPartial, DeleteResult, Repository } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { EntityId } from "typeorm/repository/EntityId";
import { IBaseService } from "./i.base.service";

export class BaseService<T extends BaseEntity, R extends Repository<T>>
  implements IBaseService<T>
{
  constructor(private readonly repository: R) {}

  index(): Promise<T[]> {
    return this.repository.find();
  }

  findById(id: EntityId): Promise<T> {
    return this.repository.findOne(id);
  }

  findByIds(id: [EntityId]): Promise<T[]> {
    return this.repository.findByIds(id);
  }

  store<K extends DeepPartial<T>>(data: K): Promise<T & K> {
    return this.repository.save(data);
  }

  async update(id: EntityId, data: QueryDeepPartialEntity<T>): Promise<T> {
    await this.repository.update(id, data);
    return this.repository.findOne(id);
  }

  delete(id: EntityId): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

  deleteItems(ids: number[]): Promise<DeleteResult> {
    return this.repository.delete(ids);
  }

  async getAll(
    pageOptionsDto: PageOptionsDto,
    entity: string,
    orderName: string,
    filtering: string[],
  ): Promise<PageDto<T>> {
    const queryBuilder = await this.repository.createQueryBuilder(entity);

    if (Array.isArray(filtering)) {
      filtering.map((filter) => {
        queryBuilder.andWhere(entity + "." + filter + " ilike :name", {
          name: "%" + pageOptionsDto.filtering + "%",
        });
      });
    } else {
      queryBuilder
        .orderBy(entity + "." + orderName, pageOptionsDto.orderType)
        .skip(pageOptionsDto.skip)
        .take(pageOptionsDto.limit);
    }

    const { entities } = await queryBuilder.getRawAndEntities();
    const itemCount = await queryBuilder.getCount();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(entities, pageMetaDto);
  }
}
