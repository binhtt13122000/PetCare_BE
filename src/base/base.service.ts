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

  getSer;

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
}
