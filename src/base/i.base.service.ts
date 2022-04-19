import { DeepPartial, DeleteResult } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { EntityId } from "typeorm/repository/EntityId";
export interface IBaseService<T> {
  index(): Promise<T[]>;

  findById(id: EntityId): Promise<T>;

  findByIds(id: [EntityId]): Promise<T[]>;

  store<K extends DeepPartial<T>>(data: K): Promise<T & K>;

  update(id: EntityId, data: QueryDeepPartialEntity<T>): Promise<T>;

  delete(id: EntityId): Promise<DeleteResult>;
}
